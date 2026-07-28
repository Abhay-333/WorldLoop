import { StatusCodes } from "http-status-codes";
import env from "../config/env.js";

const errorMiddleware = (err, req, res, next) => {
  const statusCode = err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR;

  res.status(statusCode).json({
    success: false,
    message: err.message || "Something went wrong.",
    details: err.details || null,
    statusCode,
    stack: env.NODE_ENV === "development" ? err.stack : undefined,
  });
};

export default errorMiddleware;
