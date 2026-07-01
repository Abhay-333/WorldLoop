import express from "express"
import cors from "cors";
import helmet from "helmet"; // to secure our http headers
import hpp from "hpp"; // http parameter pollution attack prevention
import compression from "compression"; // compress the size of request we receive from frontend

const securityMiddleware = (app) => {
  //   app.use(cors({origin:"",credentials:true}));
  app.use(express.json())
  app.use(express.urlencoded({ extended: true }));
  app.use(helmet());
  app.use(hpp());
  app.use(compression());
};

export default securityMiddleware