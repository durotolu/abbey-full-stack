import express from "express";
import cors from "cors";
import authRoutes from "./routes/auth.routes";
import followRoutes from "./routes/follow.routes";
import userRoutes from "./routes/user.routes";

const app = express();
const corsOrigin = process.env.CORS_ORIGIN || "http://localhost:5173";

app.use(
  cors({
    origin: corsOrigin,
  }),
);
app.use(express.json());
app.get("/health", (_req, res) => {
  res.status(200).json({ status: "ok" });
});

app.use("/auth", authRoutes);
app.use("/follow", followRoutes);
app.use("/users", userRoutes);

export default app;
