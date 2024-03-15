"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllWebsitesForUser = exports.createWebsite = void 0;
const targetAudience_model_1 = __importDefault(require("../models/targetAudience.model"));
const website_model_1 = __importDefault(require("../models/website.model"));
const generateWebsite_1 = require("../utils/generateWebsite");
const createWebsite = async (req, res) => {
    const { websiteName, websiteDescription, targetAudienceId } = req.body;
    try {
        if (!websiteName || !websiteDescription || !targetAudienceId) {
            return res.status(400).json({ error: { message: 'Missing required data' } });
        }
        const targetAudience = await targetAudience_model_1.default.findById(targetAudienceId);
        if (!targetAudience) {
            return res.status(404).json({ error: { message: 'Target audience not found' } });
        }
        const content = await (0, generateWebsite_1.generateWebsite)(websiteName, websiteDescription, targetAudience.name);
        console.log({ content });
        const newWebsite = new website_model_1.default({
            user: req.userId,
            websiteName,
            websiteDescription,
            targetAudience: targetAudience._id,
            content
        });
        await newWebsite.save();
        return res.status(201).json({ success: { data: newWebsite } });
    }
    catch (error) {
        console.error('Error creating website:', error);
        return res.status(500).json({ error: { message: 'Server error' } });
    }
};
exports.createWebsite = createWebsite;
const getAllWebsitesForUser = async (req, res) => {
    try {
        const userId = req.userId;
        const websites = await website_model_1.default.find({ user: userId }).populate('targetAudience').sort({ _id: -1 });
        res.status(200).json({ success: { data: websites } });
    }
    catch (error) {
        console.error('Error getting websites for user:', error);
        res.status(500).json({ error: { message: 'Server error' } });
    }
};
exports.getAllWebsitesForUser = getAllWebsitesForUser;
//# sourceMappingURL=website.controller.js.map