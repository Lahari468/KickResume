"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const resumeController_1 = require("../controllers/resumeController");
const authMiddleware_1 = require("../middlewares/authMiddleware");
const router = express_1.default.Router();
router.route('/').post(authMiddleware_1.protect, resumeController_1.createResume).get(authMiddleware_1.protect, resumeController_1.getAllResumesByUser);
router.route('/:id').get(authMiddleware_1.protect, resumeController_1.getResumeById).put(authMiddleware_1.protect, resumeController_1.updateResume).delete(authMiddleware_1.protect, resumeController_1.deleteResume);
router.post('/:id/download', resumeController_1.downloadResume);
exports.default = router;
