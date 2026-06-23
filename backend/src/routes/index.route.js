import express from "express";
import authRouter from "./auth.route.js";

const indexRouter = express.Router();

indexRouter.use("/auth", authRouter);

export default indexRouter;
