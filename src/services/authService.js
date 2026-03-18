import prisma from "../lib/prisma.js"
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"

// Generate a JWT for authenticated user
export function issueAuthToken(userId) {
  if (!process.env.JWT_SECRET) {
    throw new Error("JWT_SECRET is not configured")
  }

  return jwt.sign(
    { userId },
    process.env.JWT_SECRET,  // Secret key from environment
    { expiresIn: "7d" }
  )
}

export async function registerUser(email, password) {

  const normalizedEmail = email.trim().toLowerCase()
  
  // Hash the user's password before saving to the database
  const hashedPassword = await bcrypt.hash(password, 10)
  
  // Create a new user record in the database
  const user = await prisma.user.create({
    data: {
      email: normalizedEmail,
      password: hashedPassword
    }
  })
  
  return user

}

export async function loginUser(email, password) {
  
  const normalizedEmail = email.trim().toLowerCase()

  // Find user in database by email
  const user = await prisma.user.findUnique({
    where: { email: normalizedEmail }
  })

  if (!user) {
    throw new Error("User not found")
  }

  // Prevent password login if account was created via social login
  if (!user.password) {
    throw new Error("Use Google or Facebook login for this account")
  }

  // Compare input password with hashed password in database
  const validPassword = await bcrypt.compare(password, user.password)

  if (!validPassword) {
    throw new Error("Invalid password")
  }

  // Create JWT token containing the user ID
  const token = issueAuthToken(user.id)

  return { token, user }

}

// Find existing user or create a new one for social login
export async function findOrCreateSocialUser({
  email,
  provider,
  providerUserId,
}) {

  // Choose correct field based on provider
  const providerField = provider === "google" ? "googleId" : "facebookId"

  // Try to find user by provider ID or email
  let user = await prisma.user.findFirst({
    where: {
      OR: [
        { [providerField]: providerUserId },  // Match social account
        { email },  // Or match existing email
      ],
    },
  })

  if (user) {
    // If user exists but provider not linked yet
    if (!user[providerField]) {
      user = await prisma.user.update({
        where: { id: user.id },
        data: {
          [providerField]: providerUserId,  // Link social account
        },
      })
    }

    return user  // Return existing or updated user
  }

  // Create new user if none found
  return prisma.user.create({
    data: {
      email,
      [providerField]: providerUserId,  // Save provider ID
    },
  })

}
