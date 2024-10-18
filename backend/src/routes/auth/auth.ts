import { verifyToken } from "../../controllers/common";
import { CookieOptions, NextFunction, Router } from "express";
import { Request, Response } from "express";
import { multerUpload } from "../../controllers/userManagement/tools";
import { checkIfUserExists, checkUserRight, registerUser } from "../../controllers/userManagement/auth";
const authRouter = Router();

authRouter.get("/auth", multerUpload.any(), verifyToken, async (req: any, res: Response, next: NextFunction) => {
  try {
    let test = await checkUserRight(req.email, req.access_role);
    if (test) {
      res.send({ status: 200, accessRole: req.accessRole, shareClass: req.shareClass });
    } else {
      res.sendStatus(401);
    }
  } catch (error: any) {
    res.send(error);
  }
});

authRouter.post("/login", multerUpload.any(), async (req: Request, res: Response, next: NextFunction) => {
  try {
    let data = req.body;
    let email = data.email.toLocaleLowerCase().trim();
    let password = data.password;

    let user: any = await checkIfUserExists(email, password);

    let cookie: CookieOptions = {
      maxAge: 7 * 24 * 60 * 60 * 1000,
      httpOnly: process.env.PRODUCTION === "production",
      secure: process.env.PRODUCTION === "production", // Set to true if using HTTPS
      sameSite: "lax",
      path: "/",
    };
    res.clearCookie("group_2", {
      maxAge: 7 * 24 * 60 * 60 * 1000,
      httpOnly: process.env.PRODUCTION === "production",
      secure: process.env.PRODUCTION === "production", // Set to true if using HTTPS
      sameSite: "lax",
      path: "/",
    });
    console.log({ user });
    res.cookie("group_2", user, cookie);
    res.send(200);
  } catch (error: any) {
    res.send(error);
  }
});

authRouter.post("/logout", multerUpload.any(), async (req: Request, res: Response, next: NextFunction) => {
  try {
    res.clearCookie("group_2", {
      maxAge: 7 * 24 * 60 * 60 * 1000,
      httpOnly: process.env.PRODUCTION === "production",
      secure: process.env.PRODUCTION === "production", // Set to true if using HTTPS
      sameSite: "lax",
      path: "/",
    });

    res.send("Cookie cleared successfully");
  } catch (error: any) {
    res.send(error);
  }
});

authRouter.post("/sign-up", multerUpload.any(), async (req: Request, res: Response, next: NextFunction) => {
  try {
    let data = req.body;
    console.log({ data });
    let email = data.email.toLowerCase();
    let password = data.password;
    let type: any = data.type;
    let result = await registerUser(email, password, type);
    console.log(result);
    res.send(result);
  } catch (error: any) {
    res.send(error);
  }
});

export default authRouter;
