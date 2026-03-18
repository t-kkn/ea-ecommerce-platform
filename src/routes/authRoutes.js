import express from "express"
import passport, {
  facebookAuthEnabled,
  googleAuthEnabled,
} from "../lib/passport.js"
import {
  issueAuthToken,
  loginUser,
  registerUser,
} from "../services/authService.js"

const router = express.Router()

// Function to get the frontend URL
function getFrontendUrl() {
  return process.env.FRONTEND_URL || "http://localhost:3000"
}

// Redirect user to login page with an error code
function redirectWithError(res, code) {
  const url = new URL("/login", getFrontendUrl())
  url.searchParams.set("error", code)  // Add error code as query parameter
  res.redirect(url.toString())
}

// Redirect user to login page with a token
function redirectWithToken(res, token) {
  const url = new URL("/login", getFrontendUrl())
  url.searchParams.set("token", token)  // Add token as query parameter
  res.redirect(url.toString())
}

// Create POST route for user registration
router.post("/auth/register", async (req, res) => {

    try {
  
      const { email, password } = req.body

      if (!email || !password) {
        return res.status(400).json({
          error: "Email and password are required"
        })
      }

      if (password.length < 6) {
        return res.status(400).json({
          error: "Password must be at least 6 characters"
        })
      }
  
      // Call function to create a new user
      const user = await registerUser(email, password)
  
      res.json({
        message: "User created",
        user
      })
  
    } catch (error) {
      if (error?.code === "P2002") {
        return res.status(409).json({
          error: "Email already registered"
        })
      }

      res.status(500).json({
        error: error.message
      })
    }
  
  })

  // Create POST endpoint for user login
  router.post("/auth/login", async (req, res) => {

    try {
  
      const { email, password } = req.body

      if (!email || !password) {
        return res.status(400).json({
          error: "Email and password are required"
        })
      }
  
      // Call login service to verify user credentials
      const result = await loginUser(email, password)
  
      res.json(result)
  
    } catch (error) {
      res.status(401).json({
        error: error.message
      })
    }
  
  })

  // Route to start Google authentication
  router.get("/auth/google", (req, res, next) => {
  if (!googleAuthEnabled) {
    return res.status(500).json({
      error: "Google SSO is not configured",
    })
  }

  // Trigger Google OAuth via Passport
  passport.authenticate("google", {
    scope: ["profile", "email"],  // Request user's profile and email
    session: false,               // Disable session (use JWT or token instead)
  })(req, res, next)
})

// Callback route after Google authentication
router.get("/auth/google/callback", (req, res, next) => {
  if (!googleAuthEnabled) {
    return redirectWithError(res, "google_not_configured")
  }

  // Handle Google OAuth response
  passport.authenticate("google", { session: false }, (error, user) => {
    if (error || !user) {
      return redirectWithError(res, "google_login_failed")
    }

    const token = issueAuthToken(user.id)
    return redirectWithToken(res, token)
  })(req, res, next)
})

// Route to start Facebook authentication
router.get("/auth/facebook", (req, res, next) => {
  if (!facebookAuthEnabled) {
    return res.status(500).json({
      error: "Facebook SSO is not configured",
    })
  }

  // Trigger Facebook OAuth via Passport
  passport.authenticate("facebook", {
    scope: ["email"],  // Request user's email
    session: false,    // Disable session (use token instead)
  })(req, res, next)
})

// Callback route after Facebook authentication
router.get("/auth/facebook/callback", (req, res, next) => {
  if (!facebookAuthEnabled) {
    return redirectWithError(res, "facebook_not_configured")
  }

  // Handle Facebook OAuth response
  passport.authenticate("facebook", { session: false }, (error, user) => {
    if (error || !user) {
      return redirectWithError(res, "facebook_login_failed")
    }

    const token = issueAuthToken(user.id)
    return redirectWithToken(res, token)
  })(req, res, next)
})

  export default router
