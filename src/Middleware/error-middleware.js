import statusCodes from "../utils/statusCodes.js";

const errorMiddleware = (err, req, res, next) => {
  const status = err.statusCodes;
  const message = err.message || "Backend error";
  const extraDetails = err.extraDetails || "Error form core backend";

  res.status(status).json({
    success: false,
    message,
    extraDetails,
  });
};

export default errorMiddleware;
