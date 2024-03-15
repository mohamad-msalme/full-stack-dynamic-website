"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllTargetAudiences = exports.createTargetAudience = void 0;
const targetAudience_model_1 = __importDefault(require("../models/targetAudience.model"));
const createTargetAudience = async (req, res) => {
    const { name } = req.body;
    try {
        const existingAudience = await targetAudience_model_1.default.findOne({ name });
        if (existingAudience) {
            return res.status(400).json({ error: { message: 'Target audience already exists' } });
        }
        const newAudience = new targetAudience_model_1.default({ name });
        await newAudience.save();
        return res.status(201).json({ success: { data: newAudience } });
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({ error: { message: 'Server error' } });
    }
};
exports.createTargetAudience = createTargetAudience;
const getAllTargetAudiences = async (_req, res) => {
    try {
        const audiences = await targetAudience_model_1.default.find();
        return res.status(200).json({ success: {
                data: audiences
            } });
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({ error: { message: 'Server error' } });
    }
};
exports.getAllTargetAudiences = getAllTargetAudiences;
//# sourceMappingURL=targetAudience.controller.js.map