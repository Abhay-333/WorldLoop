import express from "express";
import authRouter from "../modules/auth/auth.route.js";
import userRouter from ""

const indexRouter = express.Router();
indexRouter.use("/auth", authRouter);

indexRouter.use("/user", userRouter);
export default indexRouter;
