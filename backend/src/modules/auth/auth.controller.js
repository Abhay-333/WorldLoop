import { StatusCodes } from "http-status-codes";
import logger from "../../config/logger.js";
import AuthService from "./auth.service.js";
import { NotFoundError } from "../../utils/Errors/app-errors.js";
import { appConfig } from "../../config/app.config.js";

export default class AuthController {
  constructor() {
    this.authService = new AuthService();
  }

  async registerController(req, res) {
    const { accessToken, refreshToken, newUser } =
      await this.authService.registerService(req.body);

    res.cookie("refreshToken", refreshToken, appConfig.cookie.refreshToken);
    res.cookie("accessToken", accessToken, appConfig.cookie.accessToken);

    return res.status(StatusCodes.CREATED).json({
      message: "User registered Successfully.",
      data: { newUser, accessToken, refreshToken },
    });
  }

  async loginController(req, res) {
    const { accessToken, user } = await this.authService.loginService(req.body);
    const refreshToken = user.refreshToken;

    res.cookie("refreshToken", refreshToken, appConfig.cookie.refreshToken);
    res.cookie("accessToken", accessToken, appConfig.cookie.accessToken);
    return res.status(StatusCodes.OK).json({
      message: "User Logged In Successfully.",
      data: { user, accessToken, refreshToken },
    });
  }

  async refreshController(req, res) {
    const { refreshToken } = req.cookies;
    if (!refreshToken) throw new NotFoundError("Refresh Token not found.");

    const { newRefreshToken, accessToken } =
      await this.authService.refreshService(refreshToken);

    res.cookie("refreshToken", newRefreshToken, appConfig.cookie.refreshToken);
    res.cookie("accessToken", accessToken, appConfig.cookie.accessToken);

    return res.status(StatusCodes.OK).json({
      message: "Tokens Generated Successfully.",
      tokens: { accessToken, newRefreshToken },
    });
  }

  async logoutController(req, res) {
    const refreshToken = req.cookies?.refreshToken || req.body?.refreshToken;

    await this.authService.logoutService(refreshToken);

    res.clearCookie("refreshToken", appConfig.cookie.refreshToken);
    res.clearCookie("accessToken", appConfig.cookie.accessToken);

    return res.status(StatusCodes.OK).json({
      message: "Logged out Successfully.",
    });
  }

  async forgetPasswordController(req, res) {
    const { email } = req.body;

    await this.authService.forgetPasswordService(email);

    return res.status(StatusCodes.OK).json({
      message: "Link sent Successfully.",
    });
  }

  async resetPasswordController(req, res) {
    const { email } = req.body;

    await this.authService.forgetPasswordService(email);

    res.clearCookie("refreshToken", appConfig.cookie.refreshToken);
    res.clearCookie("accessToken", appConfig.cookie.accessToken);

    return res.status(StatusCodes.OK).json({
      message: "Link sent Successfully.",
    });
  }
}
