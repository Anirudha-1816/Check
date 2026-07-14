import User from "../models/User.js";
import statusCode from "../utils/statusCodes.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

export const createUser = (req, res) => {
  try {
    const { username, email, password, age } = req.body;

    bcrypt.genSalt(10, (err, salt) => {
      if (err) {
        return res.status(500).json({
          message: err.message,
        });
      }

      bcrypt.hash(password, salt, async (err, hash) => {
        if (err) {
          return res.status(500).json({
            message: err.message,
          });
        }

        const user = await User.create({
          username,
          email,
          age,
          password: hash,
        });

        let token = jwt.sign({ email }, process.env.JWT_SECRET, {
          expiresIn: "7d",
        });
        res.cookie("token", token);

        const userResponse = {
          username: user.username,
          email: user.email,
          age: user.age,
        };

        res.status(201).json({
          success: true,
          message: "User created successfully",
          user: userResponse,
        });
      });
    });
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};

export const logOutUser = (req, res) => {
  res.clearCookie("token", {
    httpOnly: true,
    sameSite: "lax",
    secure: false,
  });

  return res.status(200).json({
    success: true,
    message: "Logout Successful",
  });
};

export const logInUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: "Invalid Password",
      });
    }

    const token = jwt.sign(
      {
        id: user._id,
        email: user.email,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "7d",
      },
    );

    res.cookie("token", token, {
      httpOnly: true,
      sameSite: "lax",
      secure: false,
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    return res.status(200).json({
      success: true,
      message: "Login Successful",
    });
  } catch (err) {
    console.log(err);

    return res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

export const passwordReset = async (req, res) => {
  try {
    const { oldPassword, newPassword } = req.body;

    // Find logged-in user
    const user = await User.findOne({
      email: req.user.email,
    });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    // Compare old password
    const isMatch = await bcrypt.compare(oldPassword, user.password);

    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: "Old password is incorrect",
      });
    }

    // Hash new password
    const salt = await bcrypt.genSalt(10);

    const hashedPassword = await bcrypt.hash(newPassword, salt);

    // Save new password
    user.password = hashedPassword;

    await user.save();

    return res.status(200).json({
      success: true,
      message: "Password changed successfully",
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};
