import express from "express";
import AuthController from "./auth.controller.js";

const authRouter = express.Router();
const authController = new AuthController();

authRouter.post(
  "/register",
  authController.registerController.bind(authController),
);

export default authRouter;
