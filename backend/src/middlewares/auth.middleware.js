import env from "../config/env.js";
import jwt from "jsonwebtoken";


const authMiddleware = (req, res, next) => {
  const { accessToken } = req.cookies;

  if (!accessToken) throw new UnauthorizedError("Access Token not found.");
  const decoded = jwt.verify(accessToken, env.ACCESS_TOKEN_SECRET);

  req.decoded = decoded;

  next();
};

export default authMiddleware;