import { Post } from "../../models/model";
import { client } from "../userManagement/auth";
import { generateKeyWords } from "./AI";

export async function addPost(post: Post) {
  try {
    const database = client.db("content");
    const postsCollection = database.collection("posts");

    // Check if a post with the same post_id already exists
    const existingPost = await postsCollection.findOne({ post_id: post.post_id });

    if (existingPost == null) {
      // If the post doesn't exist, insert it
      post.post_id = generateTenRandomNumbers();
      let keywords = await generateKeyWords(post.description || "");
      post.keywords = keywords;
      const action = await postsCollection.insertOne(post);
      return { message: "Post added successfully", status: 200 };
    } else {
      // If a post with the same post_id already exists
      return { message: "Post with this ID already exists", status: 409 };
    }
  } catch (error) {
    console.error("Error adding post:", error);
    return { message: "Error adding post", status: 500, error: error };
  }
}

export async function getAllPosts() {
  try {
    const database = client.db("content");
    const postsCollection = database.collection("posts");

    // Fetch all documents from the posts collection
    const allPosts = await postsCollection.find({}).toArray();

    if (allPosts.length > 0) {
      return { message: "Posts retrieved successfully", status: 200, data: allPosts };
    } else {
      return { message: "No posts found", status: 404 };
    }
  } catch (error) {
    console.error("Error retrieving posts:", error);
    return { message: "Error retrieving posts", status: 500, error: error };
  }
}

function generateTenRandomNumbers() {
  let numbers = "";
  for (let i = 0; i < 10; i++) {
    numbers += Math.random();
  }
  return numbers;
}
