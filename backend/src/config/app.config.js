import appConstant from "../constants/app.constant.js";
import env from "./env.js";

export const appConfig = {
  jwt: {
    refreshToken: { expiryTime: appConstant.REFRESH_TOKEN_EXPIRY },
    accessToken: { expiryTime: appConstant.ACCESS_TOKEN_EXPIRY },
  },
  cookie: {
    refreshToken: {
      httpOnly: true,
      secure: env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: appConstant.REFRESH_TOKEN_MAXAGE,
    },
    accessToken: {
      httpOnly: true,
      secure: env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: appConstant.ACCESS_TOKEN_MAXAGE,
    },
  },
};
