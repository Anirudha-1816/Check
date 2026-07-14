import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

import connectDataBase from "./config/db.js";
import router from "./routes/registerUserR.js";
// import checkForAuth from "../Middleware/authMiddleware.js";
import checkForAuth from "./Middleware/authMiddleware.js";

const app = express();

await connectDataBase();

app.use(express.json());

app.use(cookieParser());

app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "http://localhost:5175",
    ],
    credentials: true,
  })
);

app.use("/user", router);

app.get("/protected", checkForAuth, (req, res) => {
  res.status(200).json({
    success: true,

    message: "Protected Route",
    user: req.user,
  });
});

export default app;