import { StatusCodes } from "http-status-codes";
import { NotFoundError } from "../../utils/Errors/app-errors.js";
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
    const { username } = req.params;
    const user = await this.userService.getUserProfileService(username);

    if (!user) throw new NotFoundError("User not found.");

    return res
      .status(StatusCodes.OK)
      .json(
        new SuccessResponse("User fetched successfully.", user, StatusCodes.OK),
      );
  }
}
