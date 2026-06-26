import { validationResult } from "express-validator";
import { AppError } from "../utils/Errors/app-errors.js";

const validateRequest = (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res
      .status(new AppError("Validation Failed from validateRequest"))
      .json({
        success: false,
        errors: errors.array(),
      });
  }

  next();
};

export default validateRequest;
