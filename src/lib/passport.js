import dotenv from "dotenv";
import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import { Strategy as FacebookStrategy } from "passport-facebook";
import { findOrCreateSocialUser } from "../services/authService.js";

// Load environment variables from .env file
dotenv.config();

// Check if Google OAuth is properly configured
export const googleAuthEnabled = Boolean(
  process.env.GOOGLE_CLIENT_ID &&        // Google client ID exists
    process.env.GOOGLE_CLIENT_SECRET &&  // Google client secret exists
    process.env.GOOGLE_CALLBACK_URL      // Google callback URL exists
);

// Check if Facebook OAuth is properly configured
export const facebookAuthEnabled = Boolean(
  process.env.FACEBOOK_APP_ID &&        // Facebook app ID exists
    process.env.FACEBOOK_APP_SECRET &&  // Facebook app secret exists
    process.env.FACEBOOK_CALLBACK_URL   // Facebook callback URL exists
);

// Only enable Google authentication if config is available
if (googleAuthEnabled) {
  passport.use(
    new GoogleStrategy(
      {
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: process.env.GOOGLE_CALLBACK_URL,
      },

      // Callback function after Google authenticates the user
      async (_accessToken, _refreshToken, profile, done) => {
        try {
          // Extract user's email from Google profile
          const email = profile.emails?.[0]?.value;

          if (!email) {
            return done(new Error("Google account email is required"));
          }

          // Find existing user or create a new one
          const user = await findOrCreateSocialUser({
            email,
            provider: "google",
            providerUserId: profile.id,
          });

          // Pass user to Passport
          return done(null, user);
        } catch (error) {
          return done(error);
        }
      }

    )
  );
}

// Check if Facebook authentication is enabled
if (facebookAuthEnabled) {
  passport.use(
    new FacebookStrategy(
      {
        clientID: process.env.FACEBOOK_APP_ID,
        clientSecret: process.env.FACEBOOK_APP_SECRET,
        callbackURL: process.env.FACEBOOK_CALLBACK_URL,
        profileFields: ["id", "emails", "displayName"],  // Data we request from Facebook
      },

      // Callback function after Facebook authenticates the user
      async (_accessToken, _refreshToken, profile, done) => {
        try {
          // Get user's email from Facebook profile
          const email = profile.emails?.[0]?.value;

          if (!email) {
            return done(new Error("Facebook account email is required"));
          }

          // Find existing user or create a new one
          const user = await findOrCreateSocialUser({
            email,
            provider: "facebook",
            providerUserId: profile.id,
          });

          // Successfully authenticate user
          return done(null, user);
        } catch (error) {
          return done(error);
        }
      }

    )
  );
}

export default passport;
