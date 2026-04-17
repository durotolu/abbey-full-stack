import express from "express";
import cors from "cors";
import authRoutes from "./routes/auth.routes";
import followRoutes from "./routes/follow.routes";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/auth", authRoutes);
app.use("/follow", followRoutes);

export default app;
