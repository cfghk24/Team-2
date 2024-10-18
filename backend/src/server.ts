//jshint esversion:6
import authRouter from "./routes/auth/auth";
import couponRouter from "./routes/operations/coupons";
import router from "./routes/operations/main";
import postsRouter from "./routes/operations/posts";

require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const path = require("path");

const rateLimit = require("express-rate-limit");
const cookieParser = require("cookie-parser");
const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 10000, // Limit each IP to 100 requests per `window` (here, per 15 minutes)
  standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers
});

const cors = require("cors");

app.use(cookieParser());

const corsOptions = {
  origin: ["http://localhost:3000", "http://localhost:3001"],
  credentials: true, //access-control-allow-credentials:true
  optionSuccessStatus: 200,
};
// app.use(bodyParser.json({ limit: '50mb' }));
// app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));

app.use(bodyParser.json({ limit: "50mb" }));
app.use(
  bodyParser.urlencoded({
    limit: "50mb",
    extended: true,
    parameterLimit: 50000,
  })
);

app.use(cors(corsOptions));

app.use(express.static(path.join(__dirname, "/public")));

app.use("/api/web/", router);
app.use("/api/web/", authRouter);
app.use("/api/web/", postsRouter);
app.use("/api/web/", couponRouter);

app.use(apiLimiter);

const PORT = process.env.PORT || 8080;
app.listen(PORT, function () {});
