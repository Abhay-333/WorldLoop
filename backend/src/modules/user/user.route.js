import { Router } from "express";
import UserController from "./user.controller.js";
import authenticate from "../../middlewares/auth.middleware.js";

const userRouter = Router();
const userController = new UserController();

userRouter.get(
  "/:username",
  userController.getUserProfileController.bind(userController),
);

userRouter.get(
  "/:username/posts",
  authenticate,
  userController.getUserPostsController.bind(userController),
);

userRouter.put(
  "/me",
  authenticate,
  userController.updateProfileController.bind(userController),
);

userRouter.post(
  "/me/avatar",
  authenticate,
  userController.updateProfileController.bind(userController),
);

export default userRouter;
