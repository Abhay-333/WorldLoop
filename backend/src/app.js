import express from "express";
import morgan from "morgan";
import env from "./config/env.js";
import indexRouter from "./routes/index.route.js";
import errorMiddleware from "./middlewares/error.middleware.js";
import securityMiddleware from "./middlewares/security.middlware.js";

const createServer = () => {
  const app = express();

  if (env.NODE_ENV === "development") {
    app.use(morgan(env.MORGAN_LOGGER));
  }
  
  securityMiddleware(app);

  app.use("/api", indexRouter);


  // Error middleware should be used after all the routes
  app.use(errorMiddleware);

  return app;
};

export default createServer;
