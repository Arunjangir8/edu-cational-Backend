import express from "express";
import { PrismaClient } from "@prisma/client";

const router = express.Router();
const prisma = new PrismaClient();

// Get user profile
router.get("/:id", async (req, res) => {
  try {
    const user = await prisma.user.findUnique({
      where: { id: req.params.id },
    });
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch user", error });
  }
});

// Update user profile
router.put("/:id", async (req, res) => {
    try {
      const { name, phone, address, gender, Bod } = req.body;
  
      const updatedUser = await prisma.user.update({
        where: { id: req.params.id },
        data: {
          name,
          phone,
          gender,
          Bod: Bod ? new Date(Bod) : undefined, 
        },
      });
  
      res.json({ message: "Profile updated successfully", user: updatedUser });
    } catch (error) {
      console.error("Update failed:", error);
      res.status(500).json({ message: "Update failed", error });
    }
  });
  

export default router;