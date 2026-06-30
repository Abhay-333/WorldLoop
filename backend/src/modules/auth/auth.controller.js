import { StatusCodes } from "http-status-codes";
import logger from "../../config/logger.js";
import AuthService from "./auth.service.js";

export default class AuthController {
  constructor() {
    this.authService = new AuthService();
  }

  async registerController(req, res) {
    const { accessToken, refreshToken, newUser } =
      await this.authService.registerService(req.body);

    return res
      .status(StatusCodes.CREATED)
      .json({
        message: "User registered Successfully.",
        data: { newUser, accessToken, refreshToken },
      });
  }
}
