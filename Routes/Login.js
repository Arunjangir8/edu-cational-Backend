import { PrismaClient } from '@prisma/client';
import jwt from "jsonwebtoken";

const JWT_SECRET = "123456789";
const prisma = new PrismaClient();


const generateToken = (userId) => {
  return jwt.sign({ userId }, JWT_SECRET, { expiresIn: "1d" });
};

async function Signuser(req, res) {
  const { name, email, password } = req.body;
  if (!email || !password || !name) {
    return res.status(400).json({ message: "Name, email and password required" });
  }
  const existingUser = await prisma.user.findUnique({ where: { email } });
  if (existingUser) {
    return res.status(400).json({ message: "Email already in use" });
  }
  const newUser = await prisma.user.create({
    data: { name, email, password },
  });
  const token = generateToken(newUser.id);

  res.status(200).json({
    message: "Signup successful",
    token,
    user: { id: newUser.id, name: newUser.name, email: newUser.email },
  });
}

async function LoginUser(req, res) {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ message: "Email and password required" });
  }
  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) {
    return res.status(400).json({ message: "Invalid email" });
  }
  if (user.password !== password) {
    return res.status(400).json({ message: "Invalid password" });
  }
  const token = generateToken(user.id);
  res.status(200).json({
    message: "Login successful",
    token,
    user: { id: user.id, name: user.name, email: user.email },
  });
}

export { Signuser, LoginUser };