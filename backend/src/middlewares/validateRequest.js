import { validationResult } from "express-validator";
import { AppError } from "../utils/Errors/app-errors.js";
import { StatusCodes } from "http-status-codes";

const validateRequest = (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    const error = new AppError("Validation Error", StatusCodes.BAD_REQUEST, errors.array());
    return res.status(error.statusCode).json({
      success: false,
      message: error.message,
      details: error.details,
      statusCode: error.statusCode,
    });
  }

  next();
};

export default validateRequest;
