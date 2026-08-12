import express from "express";
import authRouter from "../modules/auth/auth.route.js";
import userRouter from "../modules/user/user.route.js";

const indexRouter = express.Router();

/**
 * API module registry.
 *
 * This router is mounted at `/api/v1` by the application bootstrap file.
 * Keep feature routers grouped here so every API endpoint has one
 * predictable, versioned entry point.
 */
indexRouter.use("/auth", authRouter);
indexRouter.use("/users", userRouter);

export default indexRouter;
