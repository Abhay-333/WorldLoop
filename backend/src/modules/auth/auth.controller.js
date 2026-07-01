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

    return res.status(StatusCodes.CREATED).json({
      message: "User registered Successfully.",
      data: { newUser, accessToken, refreshToken },
    });
  }

  async loginController(req, res) {
    const { accessToken, refreshToken, user } =
      await this.authService.loginService(req.body);

    return res.status(StatusCodes.OK).json({
      message: "User Logged In Successfully.",
      data: { user, accessToken, refreshToken },
    });
  }

  async refreshController(req, res) {
    const { accessToken, refreshToken, user } =
      await this.authService.loginService(req.body);

    return res.status(StatusCodes.OK).json({
      message: "User Logged In Successfully.",
      data: { user, accessToken, refreshToken },
    });

  }

  async logoutController(req, res) {
    const { accessToken, refreshToken, user } =
      await this.authService.loginService(req.body);

    return res.status(StatusCodes.OK).json({
      message: "User Logged In Successfully.",
      data: { user, accessToken, refreshToken },
    });

  }
  
}
