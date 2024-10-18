import { verifyToken } from "../../controllers/common";
import { CookieOptions, NextFunction, Router } from "express";
import { Request, Response } from "express";
import { multerUpload } from "../../controllers/userManagement/tools";
import { Coupon } from "../../models/model";
import { addCoupon, getAllCoupons } from "../../controllers/operations/couponManagement";
const couponRouter = Router();

couponRouter.get("/coupons", verifyToken, multerUpload.any(), async (req: any, res: Response, next: NextFunction) => {
  let all_coupons = await getAllCoupons();
  res.send(all_coupons);
});

couponRouter.post("/coupons", verifyToken, multerUpload.any(), async (req: any, res: Response, next: NextFunction) => {
  try {
    let coupon: Coupon = req.body;
    let result = await addCoupon(coupon);
    res.send(result);
  } catch (error: any) {
    res.send(error);
  }
});

couponRouter.post("/coupons/dummy", verifyToken, multerUpload.any(), async (req: Request, res: Response, next: NextFunction) => {
    try {
      const coupons: Coupon[] = [
        {
          coupon_id: "welcome_coupon",
          description: "15% off for your first pet care in any of our partners",
          price: 0,
          value: 200
        },
        {
          coupon_id: "mini_coupon",
          description: "15hkd off, points required: 15 points",
          price: 15,
          value: 15
        },
        {
          coupon_id: "medium_coupon_1",
          description: "50hkd off, points required: 45 points",
          price: 45,
          value: 50
        },
        {
          coupon_id: "medium_coupon_2",
          description: "50hkd off, points required: 45 points",
          price: 45,
          value: 50
        },
        {
            coupon_id: "vaccination_coupon",
            description: "Discount pet vaccination for first-time users",
            price: 20,
            value: 50
          },
          {
            coupon_id: "health_check_coupon",
            description: "25% (max 80hkd) off on a comprehensive pet health check",
            price: 20,
            value: 80
          },
          {
            coupon_id: "adoption_assistance_coupon",
            description: "50% (max 100hkd) off adoption fees for any pet",
            price: 50,
            value: 100
          }
      ];
  
      let results = [];
      for (let i = 0; i < 5; i++) {
        for (let coupon of coupons) {
          let result = await addCoupon(coupon);
          results.push(result);
        }
      }
      res.status(201).json({ message: "Coupons added successfully", results });
    } catch (error: any) {
      res.status(500).json({ message: "Error occurred", error });
    }
  });
  

export default couponRouter;
