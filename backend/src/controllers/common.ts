import { Request, Response, NextFunction, CookieOptions } from "express";
require("dotenv").config();

const jwt = require("jsonwebtoken");

export const verifyToken = (req: Request | any, res: Response, next: NextFunction) => {
  try {
    const token = req.cookies["group_2"].token;

    if (!token) {
      return res.sendStatus(401);
    }

    const decoded = jwt.verify(token, process.env.SECRET);
    req.access_role = decoded.access_role;
    req.email = decoded.email;
    if (decoded.access_role != "admin") {
      return res.sendStatus(401);
    }
    next();
  } catch (error) {
    console.log(error);
    return res.sendStatus(401);
  }
};

export function getDateTimeInMongoDBCollectionFormat(date: any) {
  let today: any = new Date(date);

  let day = today.getDate();
  let month = today.getMonth() + 1;
  let year = today.getFullYear();
  let hours: any = today.getHours();
  let minutes: any = today.getMinutes();
  if (day < 10) {
    day = "0" + day;
  }
  if (month < 10) {
    month = "0" + month;
  }

  // Pad single digit minutes or hours with a leading zero
  if (hours < 10) hours = "0" + hours;
  if (minutes < 10) minutes = "0" + minutes;

  let formattedDateTime = year + "-" + month + "-" + day + " " + hours + ":" + minutes;
  return formattedDateTime;
}
