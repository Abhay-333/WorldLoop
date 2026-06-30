import express from "express";
import AuthController from "./auth.controller.js";
import validationMiddleware from "../../middlewares/validation.middleware.js";
import { loginValidation, registerValidation } from "./auth.validation.js";

const authRouter = express.Router();
const authController = new AuthController();

authRouter.post(
  "/register",
  registerValidation,
  authController.registerController.bind(authController),
);

authRouter.post(
  "/login",
  loginValidation,
  authController.loginController.bind(authController),
);

export default authRouter;
