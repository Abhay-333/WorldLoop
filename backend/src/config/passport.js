import passport from "passport";
import { GoggleStragey as Strategy } from "passport-google-oauth20";
import env from "./env.js";
passport.use(
  new GoogleStrategy(
    {
      clientId: env.GOOGLE_CLIENT_ID,
      clientSecret: env.GOOGLE_CLIENT_SECRET,
      callbackURL: env.GOOGLE_CALLBACK_URL,
    },
    async (accessToken, refresh, profile, done) => {
      try {
        // Yahan aap profile.id se user ko apne MongoDB database mein check/save kar sakte hain
        // const user = await User.findOneAndUpdate({ googleId: profile.id }, { name: profile.displayName, email: profile.emails[0].value }, { upsert: true, new: true });
        return done(null, profile);
      } catch (err) {
        return done(err, null);
      }
    },
  ),
);
