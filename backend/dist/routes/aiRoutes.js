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
const express_1 = __importDefault(require("express"));
const openai_1 = __importDefault(require("openai"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const router = express_1.default.Router();
// ✅ Initialize OpenAI client
const openai = new openai_1.default({
    apiKey: process.env.OPENAI_API_KEY,
});
router.post("/generate-summary", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b, _c, _d, _e;
    try {
        const { personalInfo, skills, experience, education } = req.body;
        // 🧠 Build prompt dynamically
        const prompt = `
Write a concise, professional resume summary for ${personalInfo.fullName || "a candidate"}.
Consider their skills, experience, and education below:
Skills: ${skills.map((s) => s.name).join(", ")}
Experience: ${experience.map((e) => `${e.position} at ${e.company}`).join("; ")}
Education: ${education.map((e) => `${e.degree} in ${e.field}`).join("; ")}
Keep it under 80 words, in a confident, professional tone.
`;
        // ✅ OpenAI v4+ syntax
        const completion = yield openai.chat.completions.create({
            model: "gpt-4o-mini", // can also use "gpt-4-turbo" or "gpt-3.5-turbo"
            messages: [{ role: "user", content: prompt }],
            temperature: 0.7,
        });
        const summary = (_c = (_b = (_a = completion.choices[0]) === null || _a === void 0 ? void 0 : _a.message) === null || _b === void 0 ? void 0 : _b.content) === null || _c === void 0 ? void 0 : _c.trim();
        res.json({ summary });
    }
    catch (error) {
        console.error("❌ OpenAI API error:", ((_d = error.response) === null || _d === void 0 ? void 0 : _d.data) || error.message);
        res.status(500).json({
            error: "Failed to generate summary",
            details: ((_e = error.response) === null || _e === void 0 ? void 0 : _e.data) || error.message,
        });
    }
}));
exports.default = router;
