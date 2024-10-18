import { Coupon, Post } from "../../models/model";
import { client } from "../userManagement/auth";

export async function addCoupon(coupon: Coupon) {
  try {
    const database = client.db("content");
    const couponsCollection = database.collection("coupons");

    // Check if a post with the same post_id already exists
    const existingPost = await couponsCollection.findOne({ coupon_id: coupon.coupon_id });

    if (existingPost == null) {
      // If the post doesn't exist, insert it
      const action = await couponsCollection.insertOne(coupon);
      return { message: "Coupon added successfully", status: 200 };
    } else {
      // If a post with the same post_id already exists
      return { message: "COupon with this ID already exists", status: 409 };
    }
  } catch (error) {
    console.error("Error adding COupon:", error);
    return { message: "Error adding Coupon", status: 500, error: error };
  }
}

export async function getAllCoupons() {
  try {
    const database = client.db("content");
    const couponsCollection = database.collection("coupons");

    // Fetch all documents from the posts collection
    const allCoupons = await couponsCollection.find({}).toArray();

    if (allCoupons.length > 0) {
      return { message: "Coupons retrieved successfully", status: 200, data: allCoupons };
    } else {
      return { message: "No Coupons found", status: 404 };
    }
  } catch (error) {
    console.error("Error retrieving coupons:", error);
    return { message: "Error retrieving coupons", status: 500, error: error };
  }
}