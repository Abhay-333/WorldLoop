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

authRouter.post(
  "/register",
  registerValidation,
  authController.registerController.bind(authController),
);

authRouter.post(
  "/login",
  loginValidation,
  authController.loginController.bind(authController),
);

authRouter.post(
  "/refresh",
  authController.refreshController.bind(authController),
);

authRouter.post(
  "/logout",
  authController.logoutController.bind(authController),
);

authRouter.post(
  "/forgot-password",
  authController.forgetPasswordController.bind(authController),
);

authRouter.post(
  "/reset-password/:token",
  authController.resetPasswordController.bind(authController),
);

authRouter.get(
  "/verify-email/:token",
  authController.verifyEmailController.bind(authController),
);

authRouter.post(
  "/resend-verification",
  authController.resendVerificationController.bind(authController),
);

authRouter.get(
  "/google",
  passport.authenticate("google", { scope: ["profile", "email"] }),
);

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
 * @params /auth/me -> give the data of currently logged-in user to the frontend
 */
authRouter.get(
  "/me",
  authenticateMiddleware,
  authController.getMeController.bind(authController),
);

export default authRouter;
