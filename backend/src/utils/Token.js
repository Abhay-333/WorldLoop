import jwt from "jsonwebtoken";
import env from "../config/env.js";

export const generateAccessToken = (userId) => {
  return jwt.sign({ id: userId }, env.ACCESS_TOKEN_SECRET, {
    expiresIn: "1d",
  });
};

export const generateRefreshToken = (userId) => {
  return jwt.sign({ id: userId }, env.REFRESH_TOKEN_SECRET, {
    expiresIn: "7d",
  });
};

export const verifyRefreshToken = (refreshToken) => {
  const decodeID = jwt.verify(refreshToken, env.REFRESH_TOKEN_SECRET);
  return decodeID;
};

export const verifyAccessToken = (accessToken) => {
  const decodeID = jwt.verify(accessToken, env.ACCESS_TOKEN_SECRET);
  return decodeID;
};
