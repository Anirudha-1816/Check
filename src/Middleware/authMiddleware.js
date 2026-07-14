import jwt from "jsonwebtoken";
import statusCodes from "../utils/statusCodes.js";

const checkForAuth = (req, res, next) => {
  try {
    // console.log(req.cookies);

    const token = req.cookies.token;

    if (!token) {
     
      const error = {
        message: "Not valid user",
        status : statusCodes.NOT_FOUND,
        extraDetails : "login please" 

      }
      return next(error)
      
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    req.user = decoded;

    next();

  } catch (err) {

    return res.status(401).json({
      success: false,
      message: "Invalid or Expired Token",
    });
  }
};

export default checkForAuth;