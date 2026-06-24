import env from "../config/env.js";

const errorMiddleware = (err, req, res, next) => {
  res.status(err.statusCode).json({
    success: false,
    message: err.message || "Something went wrong.",
    details: err.details || null,
    stack: env.NODE_ENV === "development" ? err.stack : undefined,
  });
};

export default errorMiddleware