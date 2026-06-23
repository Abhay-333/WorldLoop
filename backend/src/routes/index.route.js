import express from "express";
import authRouter from "../modules/auth/auth.route.js";

const indexRouter = express.Router();

indexRouter.use("/auth", authRouter);

export default indexRouter;
