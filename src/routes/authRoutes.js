import express from "express"
import { registerUser, loginUser } from "../services/authService.js"

const router = express.Router()

// Create POST route for user registration
router.post("/auth/register", async (req, res) => {

    try {
  
      const { email, password } = req.body
  
      // Call function to create a new user
      const user = await registerUser(email, password)
  
      res.json({
        message: "User created",
        user
      })
  
    } catch (error) {
      res.status(500).json({
        error: error.message
      })
    }
  
  })

  // Create POST endpoint for user login
  router.post("/auth/login", async (req, res) => {

    try {
  
      const { email, password } = req.body
  
      // Call login service to verify user credentials
      const result = await loginUser(email, password)
  
      res.json(result)
  
    } catch (error) {
      res.status(401).json({
        error: error.message
      })
    }
  
  })

  export default router