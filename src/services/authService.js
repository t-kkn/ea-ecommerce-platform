import prisma from "../config/prisma.js"
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"

export async function registerUser(email, password) {
  
  // Hash the user's password before saving to the database
  const hashedPassword = await bcrypt.hash(password, 10)
  
  // Create a new user record in the database
  const user = await prisma.user.create({
    data: {
      email,
      password: hashedPassword
    }
  })
  
  return user

}

export async function loginUser(email, password) {

  // Find user in database by email
  const user = await prisma.user.findUnique({
    where: { email }
  })

  if (!user) {
    throw new Error("User not found")
  }

  // Compare input password with hashed password in database
  const validPassword = await bcrypt.compare(password, user.password)

  if (!validPassword) {
    throw new Error("Invalid password")
  }

  // Create JWT token containing the user ID
  const token = jwt.sign(
    { userId: user.id },
    process.env.JWT_SECRET,
    { expiresIn: "7d" }
  )

  return { token, user }

}