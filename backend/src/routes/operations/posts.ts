import { verifyToken } from "../../controllers/common";
import { CookieOptions, NextFunction, Router } from "express";
import { Request, Response } from "express";
import { multerUpload } from "../../controllers/userManagement/tools";
import { addPost, getAllPosts } from "../../controllers/operations/postManagement";
import { Post } from "../../models/model";
const postsRouter = Router();

postsRouter.get("/posts", verifyToken, multerUpload.any(), async (req: any, res: Response, next: NextFunction) => {
  let posts = await getAllPosts();
  res.send(posts);
});

postsRouter.post("/posts", verifyToken, multerUpload.any(), async (req: any, res: Response, next: NextFunction) => {
  try {
    let post: Post = req.body;
    if (post.picture||post.description){
      let result = await addPost(post);
      res.send(result);
    }else{
      res.status(400).json({ error: "No content provided. Please include either a picture or description." });
    }
  } catch (error: any) {
    res.send(error);
  }
});

postsRouter.post("/posts", verifyToken, multerUpload.any(), async (req: any, res: Response, next: NextFunction) => {
  try {
    let post: Post = req.body;
    if (post.picture||post.description){
      let result = await addPost(post);
      res.send(result);
    }else{
      res.status(400).json({ error: "No content provided. Please include either a picture or description." });
    }
  } catch (error: any) {
    res.send(error);
  }
});


postsRouter.post("/posts/dummy", verifyToken, multerUpload.any(), async (req: Request, res: Response, next: NextFunction) => {
  try {
    const posts: Post[] = [
      {
        email: "johndoe@example.com",
        description: "Just saw a lost dog near the cafe. Please help find the owner!",
        upvote: 15,
        type: "alert",
        keywords: ["lost dog", "cafe", "help"],
        tags: "urgent",
        picture: null
      },
      {
        email: "janedoe@example.com",
        description: "Here are some tips to keep your pet healthy during the summer.",
        upvote: 25,
        type: "post",
        keywords: ["pet health", "tips", "summer"],
        tags: "tips",
        picture: null
      }
    ];
    for (let post of posts) {
      let result = await addPost(post);
    }

    res.status(201).json({ message: "Posts added successfully", posts});
  } catch (error: any) {
    res.status(500).json({ message: "Error occurred", error });
  }
});

export default postsRouter;
