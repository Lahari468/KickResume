"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config(); // ✅ Load environment variables
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const db_1 = require("./config/db");
const userRoutes_1 = __importDefault(require("./routes/userRoutes"));
const resumeRoutes_1 = __importDefault(require("./routes/resumeRoutes"));
const aiRoutes_1 = __importDefault(require("./routes/aiRoutes")); // ✅ AI route
const app = (0, express_1.default)();
// Middleware
app.use((0, cors_1.default)({
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
}));
app.use(express_1.default.json());
app.use(express_1.default.json());
app.use(express_1.default.json());
app.get("/", (req, res) => {
    res.send("Backend working");
});
app.use("/api/users", userRoutes_1.default);
// Routes
app.use("/api/ai", aiRoutes_1.default);
app.use("/api/users", userRoutes_1.default); // Handles /register, /login, etc.
app.use("/api/resumes", resumeRoutes_1.default); // Resume CRUD routes
const PORT = process.env.PORT || 5000;
// ✅ Start server & connect DB
const startServer = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log("Connecting to MongoDB...");
        yield (0, db_1.connectDB)();
        console.log("Connected to MongoDB, starting server...");
        app.listen(PORT, () => {
            console.log(`✅ Server running on http://localhost:${PORT}`);
        });
    }
    catch (error) {
        console.error("❌ Failed to connect to DB", error);
        process.exit(1);
    }
});
// Catch-all 404 middleware
app.use((req, res) => {
    res.status(404).json({ error: "Route not found" });
});
startServer();
