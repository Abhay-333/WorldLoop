import express from "express";
import AuthController from "./auth.controller.js";
import validationMiddleware from "../../middlewares/validation.middleware.js";
import { registerValidation } from "./auth.validation.js";

const authRouter = express.Router();
const authController = new AuthController();

authRouter.post(
  "/register",
  registerValidation,
  authController.registerController.bind(authController),
);

export default authRouter;
