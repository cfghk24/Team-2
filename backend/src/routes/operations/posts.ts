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
    let result = await addPost(post);
    res.send(result);
  } catch (error: any) {
    res.send(error);
  }
});

export default postsRouter;
