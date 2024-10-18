import { verifyToken } from "../../controllers/common";
import { CookieOptions, NextFunction, Router } from "express";
import { Request, Response } from "express";
import { multerUpload } from "../../controllers/userManagement/tools";
import { addCoupon, getAllCoupons } from "../../controllers/operations/postManagement";
import { Coupon } from "../../models/model";
const couponRouter = Router();

couponRouter.get("/coupons", verifyToken, multerUpload.any(), async (req: any, res: Response, next: NextFunction) => {
  let all_coupons = await getAllCoupons();
  res.send(all_coupons);
});

couponRouter.post("/posts", verifyToken, multerUpload.any(), async (req: any, res: Response, next: NextFunction) => {
  try {
    let coupon: Coupon = req.body;
    let result = await addCoupon(coupon);
    res.send(result);
  } catch (error: any) {
    res.send(error);
  }
});

export default couponRouter;
