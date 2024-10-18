require("dotenv").config();

import { Auth, ObjectId } from "mongodb";
import { copyFileSync } from "fs";
import { getDateTimeInMongoDBCollectionFormat } from "../common";
import { UserAuth } from "../../models/auth";

export const uri = "mongodb+srv://" + process.env.MONGODBUSERNAME + ":" + process.env.NEWMONGODBPASSWORD + "@cfggroup2.yzpih.mongodb.net/?retryWrites=true&w=majority&appName=cfgGroup2";

const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const jwtSecret = process.env.SECRET;
const bcrypt = require("bcrypt");
const { MongoClient, ServerApiVersion } = require("mongodb");
const saltRounds: any = process.env.SALT_ROUNDS;
const { v4: uuidv4 } = require("uuid");

export const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

mongoose.connect(uri, {
  useNewUrlParser: true,
});

export async function registerUser(email: string, password: string, type: "admin" | "customer") {
  try {
    const database = client.db("auth");
    const usersCollection = database.collection("users");

    let salt = await bcrypt.genSalt(parseInt(saltRounds));
    let cryptedPassword = await bcrypt.hash(password, salt);

    const user = await usersCollection.findOne({ email: email });
    if (user == null) {
      const updateDoc: UserAuth = {
        email: email,
        password: cryptedPassword,
        access_role: type,
        created_on: getDateTimeInMongoDBCollectionFormat(new Date()),
        last_access_time: getDateTimeInMongoDBCollectionFormat(new Date()),
      };
      const action = await usersCollection.insertOne(updateDoc);
      return { message: "registered", status: 200 };
    } else if (user) {
      return { message: "user already exist", status: 404 };
    } else {
      return { message: "unauthorized", status: 401 };
    }
  } catch (error) {
    return error;
  }
}
export async function checkIfUserExists(email: string, password: string): Promise<{ status: 200 | 401; message: null | string; email: string | null; token: string | null; access_role: string | null }> {
  try {
    const database = client.db("auth");
    const usersCollection = database.collection("users");

    const user: any = await usersCollection.findOne({ email: email });
    if (user) {
      try {
        const result = await bcrypt.compare(password, user.password);
        if (result) {
          const jwtObject = { email: email, access_role: user["access_role"] };
          const token = jwt.sign(jwtObject, jwtSecret, { expiresIn: "24h" });
          const updateDoc = {
            $set: {
              last_access_time: getDateTimeInMongoDBCollectionFormat(new Date()),
            },
          };
          let action = await usersCollection.updateOne(
            { _id: user["_id"] },
            updateDoc // Filter to match the document
          );
          return {
            message: "authenticated",
            status: 200,
            email: email,
            token: token,
            access_role: user["access_role"],
          };
        } else {
          return { message: "Wrong Password", status: 401, token: null, email: null, access_role: null };
        }
      } catch (error) {
        return { message: "unexpected error", status: 401, token: null, email: null, access_role: null };

        // handle error appropriately
      }
    } else {
      return { message: "user does not exist", status: 401, token: null, email: null, access_role: null };
    }
  } catch (error) {
    return { message: "unexpected error", status: 401, token: null, email: null, access_role: null };
  }
}

export async function resetPassword(userEmail: string, resetCode: string, enteredPassword: string) {
  const database = client.db("auth");
  const usersCollection = database.collection("users");

  const user = await usersCollection.findOne({ email: userEmail });
  if (user) {
    try {
      let resetPasswordCode = user.resetCode;
      if (resetPasswordCode == resetCode) {
        let salt = await bcrypt.genSalt(parseInt(saltRounds));
        let cryptedPassword = await bcrypt.hash(enteredPassword, salt);
        const filter = {
          email: user.email,
        };
        const updateDoc = {
          $set: {
            password: cryptedPassword,
            resetCode: "",
            resetPassword: "true",
          },
        };

        const action = await usersCollection.updateOne(filter, updateDoc);
        return {
          message: "Password Reset!",
          status: 200,
          email: user.email,
        };
      } else {
        return { message: "code does not match" };
      }
    } catch (error) {
      return error;
      // handle error appropriately
    }
  } else {
    return { message: "User does not exist, please sign up!", status: 401 };
  }
}

export async function checkUserRight(email: string, access_role: string) {
  const database = client.db("auth");
  const usersCollection = database.collection("users");

  // Find the user with the specified email, access role, and share class
  const user = await usersCollection.findOne({
    email: email,
    access_role: access_role,
  });

  // Return true if a matching user is found, otherwise false
  return user !== null;
}
