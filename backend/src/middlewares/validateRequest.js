import { validationResult } from "express-validator";
import { AppError } from "../utils/Errors/app-errors.js";

const validateRequest = (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    const error = new AppError("Validation Error", 400, errors.array());
    return res.status(error).json({
      success: false,
      errors: errors.array(),
    });
  }

  next();
};

export default validateRequest;
