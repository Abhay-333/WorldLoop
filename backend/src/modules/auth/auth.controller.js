import { StatusCodes } from "http-status-codes";
import logger from "../../config/logger.js";
import AuthService from "./auth.service.js";
import { AppError, NotFoundError } from "../../utils/Errors/app-errors.js";
import { appConfig } from "../../config/app.config.js";
import env from "../../config/env.js";
import { sendVerifyLink } from "../../utils/sendVerifyLink.js";

export default class AuthController {
  constructor() {
    this.authService = new AuthService();
  }

  async registerController(req, res) {
    const { accessToken, refreshToken, newUser, verificationToken } =
      await this.authService.registerService(req.body);

    const verifyLink = `${env.CLIENT_URL}/verify-email/${verificationToken}`;
    await sendVerifyLink(newUser, verifyLink);

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
    const { token } = req.params;
    const { password } = req.body;

    if (!token) throw new NotFoundError("Token not found in reset-password.");
    if (!password) throw new AppError("Password not receive.");

    await this.authService.resetPasswordService(token, password);

    return res.status(StatusCodes.OK).json({
      message: "Password reset Successfully.",
    });
  }

  /**
   * Handles user email verification via the token sent during registration.
   *
   * @param {Object} req - Express request object.
   * @param {Object} res - Express response object.
   * @returns {Promise<Object>} JSON response confirming successful verification.
   */
  
  async verifyEmailController(req, res) {
    const { token } = req.params;

    if (!token) throw new NotFoundError("Token not found.");

    const result = await this.authService.verifyEmailService(token);

    return res.status(StatusCodes.OK).json({
      message: result,
    });
  }

  async resendVerificationController(req, res) {
    const { email } = req.body;

    if (!email) throw new NotFoundError("Email not found.");

    const { user, verificationToken, message } =
      await this.authService.resendVerificationService(email);

    const verifyLink = `${env.CLIENT_URL}/verify-email/${verificationToken}`;

    await sendVerifyLink(user, verifyLink);
    return res.status(StatusCodes.OK).json({
      message: message,
    });
  }
}
