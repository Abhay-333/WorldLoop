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

authRouter.post(
  "/refresh",
  authController.refreshController.bind(authController),
);

authRouter.post(
  "/logout",
  authController.logoutController.bind(authController),
);

authRouter.post(
  "/forget-password",
  authController.forgetPasswordController.bind(authController),
);

authRouter.post(
  "/reset-password/:token",
  authController.resetPasswordController.bind(authController),
);

export default authRouter;
