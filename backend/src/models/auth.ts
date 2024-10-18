export interface UserAuth {
  email: string;
  password: string;
  access_role: "admin" | "customer";
  created_on: string;
  last_access_time: string;
}
