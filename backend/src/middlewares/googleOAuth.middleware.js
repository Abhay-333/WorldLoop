import passport from "passport";
import session from "express-session";
import env from "../config/env.js";

const googleOAuthMiddleware = (app) => {
  return async (req, res, err) => {
    app.use(
      session({
        secret: env.SESSION_SECRET,
        resave: false, //Ye session ko tabhi save karta hai jab usme koi change aaya ho.
        saveUninitialized: false, //Ye nayi aur empty session ko bhi force karke save karta hai, bhale hi user ne login na kiya ho ya session mein kuch store na kiya ho
      }),
    );
    app.use(passport.initialize());
    app.use(passport.session());
  };
};

export default googleOAuthMiddleware;
