export interface UserAuthFinal {
  email: string;
  password: string;
  access_role: "admin" | "customer";
  created_on: string;
  last_access_time: string;
  points: number;
  bought_coupons: string[];
}

export interface Post {
  post_id: string;
  email: string;
  description: string | null;
  upvote: number;
  type: "alert" | "post";
  keywords: string[];
  tags: "urgent" | "tips" | "cafe" | "meme";
  picture: string | null;
}

export interface Coupon {
  coupon_id: string;
  description: string;
  price: number;
  value: number;
}
