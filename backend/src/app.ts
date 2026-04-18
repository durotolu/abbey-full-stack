import express from "express";
import cors from "cors";
import authRoutes from "./routes/auth.routes";
import followRoutes from "./routes/follow.routes";
import userRoutes from "./routes/user.routes";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/auth", authRoutes);
app.use("/follow", followRoutes);
app.use("/users", userRoutes);

export default app;
