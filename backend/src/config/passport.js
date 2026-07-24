import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import env from "./env.js";
import crypto from "crypto";
import UserModel from "../models/user.model.js";

passport.use(
  new GoogleStrategy(
    {
      clientID: env.GOOGLE_CLIENT_ID,
      clientSecret: env.GOOGLE_CLIENT_SECRET,
      callbackURL: env.GOOGLE_CALLBACK_URL,
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        const email = profile.emails?.[0]?.value;
        if (!email) return done(new Error("Google profile has no email"), null);

        let user = await UserModel.findOne({ email });
        if (!user) {
          const username = (profile.displayName || email.split("@")[0])
            .replace(/\s+/g, "")
            .toLowerCase();
          const password = crypto.randomBytes(16).toString("hex");
          user = await UserModel.create({
            username,
            email,
            password,
            isEmailVerified: true,
            avatar: { url: profile.photos?.[0]?.value || undefined },
          });
        }

        return done(null, user);
      } catch (err) {
        return done(err, null);
      }
    },
  ),
);

// Session handling
passport.serializeUser((user, done) => done(null, user._id?.toString() || user.id));

passport.deserializeUser(async (id, done) => {
  try {
    const user = await UserModel.findById(id);
    done(null, user);
  } catch (error) {
    done(error, null);
  }
});
