import { StatusCodes } from "http-status-codes";
import {
  BadRequestError,
  NotFoundError,
} from "../../utils/Errors/app-errors.js";
import { SuccessResponse } from "../../utils/SuccessResponse/SuccessResponse.js";
import UserService from "./user.service.js";

export default class UserController {
  constructor() {
    this.userService = new UserService();
  }

  async getUserProfileController(req, res) {
    const { username } = req.params;
    const user = await this.userService.getUserProfileService(username);

    if (!user) throw new NotFoundError("User not found.");

    return res
      .status(StatusCodes.OK)
      .json(
        new SuccessResponse("User fetched successfully.", user, StatusCodes.OK),
      );
  }

  async updateProfileController(req, res) {
    const userId = req.user.id;
    const profileData = req.body;

    const user = await this.userService.updateProfileService(
      userId,
      profileData,
    );

    return res
      .status(StatusCodes.OK)
      .json(
        new SuccessResponse(
          "Profile updated successfully.",
          user,
          StatusCodes.OK,
        ),
      );
  }

  async getUserPostsController(req, res) {
    const userId = req.user.id;
    const userPosts = await this.userService.getUserPostsService(userId);

    if (!userPosts) throw new NotFoundError("Posts not found.");
    if (userPosts.length <= 0)
      throw new NotFoundError("User has not post yet.");

    return res
      .status(StatusCodes.OK)
      .json(
        new SuccessResponse(
          "User Posts fetched successfully.",
          userPosts,
          StatusCodes.OK,
        ),
      );
  }

  async updateAvatarController(req, res) {
    const userId = req.user.id;

    if (!req.file) throw new BadRequestError("Avatar image is Required.");
    const user = await this.userService.updateAvatarService(userId, req.file);

    return res
      .status(StatusCodes.OK)
      .json(
        new SuccessResponse(
          "User Avatar updated Successfully.",
          user,
          StatusCodes.OK,
        ),
      );
  }

  async deleteAvatarController(req, res) {
    const userId = req.user.id;
    const user = await this.userService.deleteAvatarService(userId);

    const user = await this.userService.updateProfileService(
      userId,
      profileData,
    );

    return res
      .status(StatusCodes.OK)
      .json(
        new SuccessResponse(
          "User Avatar Removed Successfully.",
          user,
          StatusCodes.OK,
        ),
      );
  }

  async updatePrivacyController(req, res) {
    const userId = req.user.id;
    const user = await this.userService.updatePrivacyService(userId);

    return res
      .status(StatusCodes.OK)
      .json(
        new SuccessResponse(
          `Account is now ${user.isPrivateAccount ? "private" : "public"}.`,
          user,
          StatusCodes.OK,
        ),
      );
  }

  async getUserFollowersController(req, res) {
    const { username } = req.params;
    const followers = await this.userService.getUserFollowersService(username);

    return res
      .status(StatusCodes.OK)
      .json(
        new SuccessResponse(
          `Followers fetched successfully.`,
          followers,
          StatusCodes.OK,
        ),
      );
  }

  async getUserFollowingController(req, res) {
    const { username } = req.params;
    const following =
      await this.userService.getFollowing(username);

    return res
      .status(StatusCodes.OK)
      .json(
        new SuccessResponse(
          `Following Users fetched successfully.`,
          following,
          StatusCodes.OK,
        ),
      );
  }
}
