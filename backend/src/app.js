import express from "express";
import indexRouter from "./routes/index.route.js";

const createServer = () => {
  const app = express();

  app.use("/api", indexRouter);
  return app;
};

export default createServer;
