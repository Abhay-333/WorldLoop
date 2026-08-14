import { Router } from "express";
import UserController from "./user.controller.js";
import authenticate from "../../middlewares/auth.middleware.js";
import upload from "../../middlewares/multer.middleware.js";

const userRouter = Router();
const userController = new UserController();
/**
 * Returns a profile identified by its public username.
 *
 * @route GET /api/v1/users/:username
 * @access Public
 */
userRouter.get(
  "/:username",
  userController.getUserProfileController.bind(userController),
);

/**
 * Returns non-archived posts associated with a profile.
 *
 * Authentication is needed for eventual viewer-specific state, such as
 * follow, like, and saved-post flags.
 *
 * @route GET /api/v1/users/:username/posts
 * @access Private
 */
userRouter.get(
  "/:username/posts",
  authenticate,
  userController.getUserPostsController.bind(userController),
);

/**
 * Updates the authenticated user's editable profile fields.
 *
 * @route PATCH /api/v1/users/profile
 * @access Private
 */
userRouter.patch(
  "/profile",
  authenticate,
  userController.updateProfileController.bind(userController),
);

/**
 * Reserves an endpoint for authenticated avatar updates.
 *
 * Multipart upload and media-storage middleware must be added before this
 * endpoint is production-ready.
 *
 * @route POST /api/v1/users/profile/avatar
 * @access Private
 */
userRouter.patch(
  "/profile/avatar",
  authenticate,
  upload.single("avatar"),
  userController.updateAvatarController.bind(userController),
);

/**
 * Reserves an endpoint for authenticated avatar.
 * When User wants to delete his/her current avatar.
 * Remove avatar, revert to default
 * @route DELETE /api/v1/users/profile/avatar
 * @access Private
 */
userRouter.delete(
  "/profile/avatar",
  authenticate,
  userController.deleteAvatarController.bind(userController),
);

export default userRouter;
