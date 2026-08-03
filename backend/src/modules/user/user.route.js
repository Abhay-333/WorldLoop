import { Router } from "express";
import UserController from "./user.controller";

const userRouter = Router;
const userController = new UserController();

userRouter.get("/users/:username", userController.getUser.bind(userController));

export default userRouter;
