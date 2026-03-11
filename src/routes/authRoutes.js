import express from "express"
import { registerUser, loginUser } from "../services/authService.js"

const router = express.Router()

router.post("/auth/register", async (req, res) => {

    try {
  
      const { email, password } = req.body
  
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

  router.post("/auth/login", async (req, res) => {

    try {
  
      const { email, password } = req.body
  
      const result = await loginUser(email, password)
  
      res.json(result)
  
    } catch (error) {
  
      res.status(401).json({
        error: error.message
      })
  
    }
  
  })

  export default router