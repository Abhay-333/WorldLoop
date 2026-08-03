import { Router } from "express";
import UserController from "./user.controller.js";

const userRouter = Router();
const userController = new UserController();

userRouter.get(
  "/users/:username",
  userController.getUserController.bind(userController),
);

export default userRouter;