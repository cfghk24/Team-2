import { verifyToken } from "../../controllers/common";
import { CookieOptions, NextFunction, Router } from "express";
import { Request, Response } from "express";
import { multerUpload } from "../../controllers/userManagement/tools";
const router = Router();

router.get("/test", multerUpload.any(), async (req: any, res: Response, next: NextFunction) => {
  console.log({ body: req.body });
  res.send(200);
});

export default router;
