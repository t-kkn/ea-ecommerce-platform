import jwt from "jsonwebtoken"

export default function authMiddleware(req, res, next) {

    // Get the Authorization header from the request
    const authHeader = req.headers.authorization
  
    if (!authHeader) {
      return res.status(401).json({ error: "No token provided" })
    }
  
    // Extract the token from "Bearer TOKEN"
    const token = authHeader.split(" ")[1]
  
    try {
        
        // Verify the token using the secret key
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        
        // Save the userId from the token to the request
        req.userId = decoded.userId
        
        // Continue to the next middleware or route
        next()
  
    } catch (error) {
  
      return res.status(401).json({ error: "Invalid token" })
  
    }
  
  }