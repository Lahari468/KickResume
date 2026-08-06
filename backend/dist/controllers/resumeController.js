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
exports.downloadResume = exports.getAllResumesByUser = exports.deleteResume = exports.updateResume = exports.getResumeById = exports.createResume = void 0;
const resume_model_1 = __importDefault(require("../models/resume.model"));
const createResume = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const resume = yield resume_model_1.default.create(Object.assign(Object.assign({}, req.body), { user: req.user._id }));
        res.status(201).json(resume);
    }
    catch (err) {
        res.status(500).json({ error: 'Failed to create resume', details: err });
    }
});
exports.createResume = createResume;
const getResumeById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const resume = yield resume_model_1.default.findOne({ _id: req.params.id, user: req.user._id });
        if (!resume)
            return res.status(404).json({ error: 'Resume not found' });
        res.json(resume);
    }
    catch (err) {
        res.status(500).json({ error: 'Failed to fetch resume' });
    }
});
exports.getResumeById = getResumeById;
const updateResume = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const updated = yield resume_model_1.default.findOneAndUpdate({ _id: req.params.id, user: req.user._id }, req.body, { new: true });
        if (!updated)
            return res.status(404).json({ error: 'Resume not found' });
        res.json(updated);
    }
    catch (err) {
        res.status(500).json({ error: 'Failed to update resume' });
    }
});
exports.updateResume = updateResume;
const deleteResume = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const deleted = yield resume_model_1.default.findOneAndDelete({ _id: req.params.id, user: req.user._id });
        if (!deleted)
            return res.status(404).json({ error: 'Resume not found' });
        res.json({ message: 'Resume deleted' });
    }
    catch (err) {
        res.status(500).json({ error: 'Failed to delete resume' });
    }
});
exports.deleteResume = deleteResume;
const getAllResumesByUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const resumes = yield resume_model_1.default.find({ user: req.user._id });
        res.json(resumes);
    }
    catch (err) {
        res.status(500).json({ error: 'Failed to fetch resumes' });
    }
});
exports.getAllResumesByUser = getAllResumesByUser;
const downloadResume = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const resume = yield resume_model_1.default.findById(id);
        if (!resume)
            return res.status(404).json({ message: 'Resume not found' });
        // increment and save
        resume.downloads += 1;
        yield resume.save();
        // return success (later you can stream a real PDF)
        return res.json({ message: 'Download recorded', downloads: resume.downloads });
    }
    catch (error) {
        console.error('Error recording download:', error);
        res.status(500).json({ message: 'Failed to record download' });
    }
});
exports.downloadResume = downloadResume;
