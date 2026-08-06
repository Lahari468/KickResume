import dotenv from "dotenv";
dotenv.config(); // ✅ Load environment variables

import express from "express";
import cors from "cors";
import { connectDB } from "./config/db";
import userRoutes from "./routes/userRoutes";
import resumeRoutes from "./routes/resumeRoutes";
import aiRoutes from "./routes/aiRoutes"; // ✅ AI route

const app = express();

// Middleware
<<<<<<< HEAD
app.use(cors());
app.use(express.json());
=======
app.use(
  cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  })
);

app.use(express.json());
app.use(express.json());

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Backend working");
});

app.use("/api/users", userRoutes);
>>>>>>> e0c9373 (Initial Commit)

// Routes
app.use("/api/ai", aiRoutes);
app.use("/api/users", userRoutes); // Handles /register, /login, etc.
app.use("/api/resumes", resumeRoutes); // Resume CRUD routes

const PORT = process.env.PORT || 5000;

// ✅ Start server & connect DB
const startServer = async () => {
  try {
    console.log("Connecting to MongoDB...");
    await connectDB();
    console.log("Connected to MongoDB, starting server...");
    app.listen(PORT, () => {
      console.log(`✅ Server running on http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error("❌ Failed to connect to DB", error);
    process.exit(1);
  }
};

// Catch-all 404 middleware
app.use((req, res) => {
  res.status(404).json({ error: "Route not found" });
});

startServer();
