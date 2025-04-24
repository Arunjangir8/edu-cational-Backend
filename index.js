import express from "express";
import cors from "cors"
import { PrismaClient } from '@prisma/client';
import { Signuser , LoginUser } from "./Routes/Login.js";

const app = express();
const PORT = 3000;

app.use(express.json());
app.use(cors({ origin: "http://localhost:5173", credentials: true }));


app.post("/signup",Signuser)
app.post("/login",LoginUser)


app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
