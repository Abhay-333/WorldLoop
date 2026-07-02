import { body, validationResult } from "express-validator";
import validateRequest from "../../middlewares/validateRequest.js";

export const registerValidation = [
  body("username")
    .trim()
    .notEmpty()
    .withMessage("Username is required")
    .isLength({ min: 3, max: 30 })
    .withMessage("Username must be between 3 and 30 characters")
    .withMessage("Username must be lowercase"),

  body("fullName")
    .optional()
    .trim()
    .isLength({ max: 100 })
    .withMessage("Full name cannot exceed 100 characters"),

  body("email")
    .trim()
    .notEmpty()
    .withMessage("Email is required")
    .isEmail()
    .withMessage("Invalid email address")
    .normalizeEmail(),

  body("password")
    .notEmpty()
    .withMessage("Password is required")
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters"),

  body("bio")
    .optional()
    .isLength({ max: 200 })
    .withMessage("Bio cannot exceed 200 characters"),

  validateRequest,
];

export const loginValidation = [
  body("email")
    .trim()
    .notEmpty()
    .withMessage("Email is required")
    .isEmail()
    .withMessage("Invalid email address"),

  body("password")
    .notEmpty()
    .withMessage("Password is required"),

  validateRequest,
];