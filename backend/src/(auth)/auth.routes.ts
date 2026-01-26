import { Router } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { prisma } from "../lib/prisma";

const router = Router();
const JWT_SECRET = process.env.JWT_SECRET || "your-secret-key-change-this";
const SALT_ROUNDS = 10;

// Sign Up
router.post("/signup", async (req, res) => {
  try {
    const { firstName, lastName, lrn, email, password } = req.body;

    // Validate input
    if (!firstName || !lastName || !lrn || !email || !password) {
      return res.status(400).json({ error: "All fields are required" });
    }

    // Validate LRN length
    if (lrn.length !== 12) {
      return res.status(400).json({ error: "LRN must be exactly 12 digits" });
    }

    // Check if user already exists
    const existingUser = await prisma.user.findFirst({
      where: {
        OR: [{ lrn }, { email }],
      },
    });

    if (existingUser) {
      if (existingUser.lrn === lrn) {
        return res.status(409).json({ error: "LRN already registered" });
      }
      return res.status(409).json({ error: "Email already registered" });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);

    // Create user
    const user = await prisma.user.create({
      data: {
        firstName,
        lastName,
        lrn,
        email,
        password: hashedPassword,
        role: "STUDENT",
      },
      select: {
        id: true,
        firstName: true,
        lastName: true,
        lrn: true,
        email: true,
        role: true,
        createdAt: true,
      },
    });

    // Generate JWT token
    const token = jwt.sign({ userId: user.id, lrn: user.lrn }, JWT_SECRET, {
      expiresIn: "7d",
    });

    res.status(201).json({
      message: "User created successfully",
      user,
      token,
    });
  } catch (error) {
    console.error("Signup error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Sign In
router.post("/signin", async (req, res) => {
  try {
    const { lrn, password } = req.body;

    // Validate input
    if (!lrn || !password) {
      return res.status(400).json({ error: "LRN and password are required" });
    }

    // Validate LRN length
    if (lrn.length !== 12) {
      return res.status(400).json({ error: "Invalid LRN format" });
    }

    // Find user by LRN
    const user = await prisma.user.findUnique({
      where: { lrn },
    });

    if (!user) {
      return res.status(401).json({ error: "Invalid LRN or password" });
    }

    // Verify password
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(401).json({ error: "Invalid LRN or password" });
    }

    // Generate JWT token
    const token = jwt.sign({ userId: user.id, lrn: user.lrn }, JWT_SECRET, {
      expiresIn: "7d",
    });

    res.json({
      message: "Login successful",
      user: {
        id: user.id,
        firstName: user.firstName,
        lastName: user.lastName,
        lrn: user.lrn,
        email: user.email,
        role: user.role,
      },
      token,
    });
  } catch (error) {
    console.error("Signin error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Verify Token (optional - for checking if user is authenticated)
router.get("/verify", async (req, res) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];

    if (!token) {
      return res.status(401).json({ error: "No token provided" });
    }

    const decoded = jwt.verify(token, JWT_SECRET) as {
      userId: number;
      lrn: string;
    };

    const user = await prisma.user.findUnique({
      where: { id: decoded.userId },
      select: {
        id: true,
        firstName: true,
        lastName: true,
        lrn: true,
        email: true,
        role: true,
      },
    });

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    res.json({ user });
  } catch (error) {
    console.error("Token verification error:", error);
    res.status(401).json({ error: "Invalid or expired token" });
  }
});

export default router;
