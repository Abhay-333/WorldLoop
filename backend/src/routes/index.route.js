import express from "express";
import authRouter from "../modules/auth/auth.route.js";
import userRouter from "../modules/user/user.route.js";

const indexRouter = express.Router();
indexRouter.use("/auth", authRouter);

indexRouter.use("/user", userRouter);
export default indexRouter;
