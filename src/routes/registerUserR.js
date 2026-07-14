import express from "express";
import {
  createUser,
  logInUser,
  logOutUser,
  passwordReset,
} from "../controllers/authController.js";

import checkForAuth from "../Middleware/authMiddleware.js";

const router = express.Router();

router.post("/register", createUser);
router.post("/logoutUser", logOutUser);
router.post("/loginUser", logInUser);
router.put("/change", checkForAuth, passwordReset);

export default router;
