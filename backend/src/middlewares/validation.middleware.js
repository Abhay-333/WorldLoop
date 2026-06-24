import { validationResult } from "express-validator";
import { BadRequestError } from "../utils/Errors/app-errors";

const validationMiddleware = (req, res, next) => {
  const errors = validationResult(req); // this collects all the errors in the app

  if (!errors.isEmpty())
    return next(new BadRequestError("Validation Failed", errors.array()));

  next();
};

export default validationMiddleware;
