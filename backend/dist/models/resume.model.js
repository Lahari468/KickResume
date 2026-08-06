"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importStar(require("mongoose"));
const resumeSchema = new mongoose_1.Schema({
    user: { type: mongoose_1.Schema.Types.ObjectId, ref: 'User', required: true },
    template: { type: String, required: true },
    downloads: { type: Number, default: 0 },
    personalInfo: {
        fullName: String,
        email: String,
        phone: String,
        location: String,
        website: String,
        github: String,
    },
    summary: { type: String },
    experience: [
        {
            jobTitle: String,
            company: String,
            location: String,
            startDate: String,
            endDate: String,
            current: Boolean,
            description: String,
        },
    ],
    education: [
        {
            institution: String,
            degree: String,
            fieldOfStudy: String,
            startDate: String,
            endDate: String,
            gpa: String,
            current: Boolean,
        },
    ],
    skills: [
        {
            name: String,
            level: String,
        },
    ],
    projects: [
        {
            name: String,
            url: String,
            description: String,
            technologies: [String],
        },
    ],
    languages: [
        {
            name: String,
            level: String,
        },
    ],
    certifications: [String],
});
exports.default = mongoose_1.default.model('Resume', resumeSchema);
