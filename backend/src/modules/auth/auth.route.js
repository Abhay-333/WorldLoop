import express from "express";
import AuthController from "./auth.controller.js";
import validationMiddleware from "../../middlewares/validation.middleware.js";
import { loginValidation, registerValidation } from "./auth.validation.js";
import passport from "passport";
import googleOAuthMiddleware from "../../middlewares/googleOAuth.middleware.js";
import env from "../../config/env.js";
import authenticateMiddleware from "../../middlewares/auth.middleware.js";
import { generateAccessToken, generateRefreshToken } from "../../utils/Token.js";
import { appConfig } from "../../config/app.config.js";

const authRouter = express.Router();
const authController = new AuthController();

/**
 * Creates an account and starts the email-verification flow.
 *
 * @route POST /api/v1/auth/register
 * @access Public
 */
authRouter.post(
  "/register",
  registerValidation,
  authController.registerController.bind(authController),
);

/**
 * Authenticates a verified user and issues access and refresh-token cookies.
 *
 * @route POST /api/v1/auth/login
 * @access Public
 */
authRouter.post(
  "/login",
  loginValidation,
  authController.loginController.bind(authController),
);

/**
 * Rotates a valid refresh token and creates a new access token.
 *
 * @route POST /api/v1/auth/refresh
 * @access Public (requires a valid refresh-token cookie)
 */
authRouter.post(
  "/refresh",
  authController.refreshController.bind(authController),
);

/**
 * Invalidates the active refresh token and clears authentication cookies.
 *
 * @route POST /api/v1/auth/logout
 * @access Public (requires a refresh token when a session exists)
 */
authRouter.post(
  "/logout",
  authController.logoutController.bind(authController),
);

/**
 * Sends a time-limited password-reset link to the supplied email address.
 *
 * @route POST /api/v1/auth/forgot-password
 * @access Public
 */
authRouter.post(
  "/forgot-password",
  authController.forgetPasswordController.bind(authController),
);

/**
 * Resets a password using the one-time token from the reset email.
 *
 * @route POST /api/v1/auth/reset-password/:token
 * @access Public
 */
authRouter.post(
  "/reset-password/:token",
  authController.resetPasswordController.bind(authController),
);

/**
 * Verifies an account email using the one-time registration token.
 *
 * @route GET /api/v1/auth/verify-email/:token
 * @access Public
 */
authRouter.get(
  "/verify-email/:token",
  authController.verifyEmailController.bind(authController),
);

/**
 * Sends a replacement verification link for an unverified account.
 *
 * @route POST /api/v1/auth/resend-verification
 * @access Public
 */
authRouter.post(
  "/resend-verification",
  authController.resendVerificationController.bind(authController),
);

/**
 * Starts the Passport-managed Google OAuth authorization flow.
 *
 * @route GET /api/v1/auth/google
 * @access Public
 */
authRouter.get(
  "/google",
  passport.authenticate("google", { scope: ["profile", "email"] }),
);

/**
 * Completes Google OAuth, persists token cookies, and redirects to the client.
 *
 * @route GET /api/v1/auth/google/callback
 * @access Public
 */
authRouter.get(
  "/google/callback",
  (req, res, next) => {
    console.log("✅ CALLBACK HIT");
    next();
  },
  passport.authenticate("google", {
    failureRedirect: env.FAILURE_REDIRECT,
    session: true,
  }),
  async (req, res) => {
    console.log("✅ LOGIN SUCCESS");
    const user = req.user;
    if (!user) {
      return res.redirect(env.FAILURE_REDIRECT);
    }

    const accessToken = generateAccessToken(user._id);
    const refreshToken = generateRefreshToken(user._id);

    user.refreshToken = refreshToken;
    await user.save();

    res.cookie("refreshToken", refreshToken, appConfig.cookie.refreshToken);
    res.cookie("accessToken", accessToken, appConfig.cookie.accessToken);

    return res.redirect(env.CLIENT_HOME_PAGE);
  },
);

/**
 * Returns the current authenticated user's account data.
 *
 * @route GET /api/v1/auth/me
 * @access Private
 */
authRouter.get(
  "/me",
  authenticateMiddleware,
  authController.getMeController.bind(authController),
);

export default authRouter;
