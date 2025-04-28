import express from "express";
import cors from "cors";
import { PrismaClient } from '@prisma/client';
import { Signuser, LoginUser } from "./Routes/Login.js";
import ProfileRoutes from "./Routes/Profile.js";

const app = express();
const prisma = new PrismaClient(); // <-- You missed this line
const PORT = 3000;

app.use(express.json());
app.use(cors({ origin: "https://edu-cational-git-main-arunjangir9987-gmailcoms-projects.vercel.app", credentials: true }));

app.post("/signup", Signuser);
app.post("/login", LoginUser);

app.use("/profile", ProfileRoutes);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
