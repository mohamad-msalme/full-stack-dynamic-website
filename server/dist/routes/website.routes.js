"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const website_controller_1 = require("../controllers/website.controller");
const auth_middleware_1 = require("../middlewares/auth.middleware");
const router = express_1.default.Router();
router.post('/new', auth_middleware_1.authenticateUser, website_controller_1.createWebsite);
router.get('/', auth_middleware_1.authenticateUser, website_controller_1.getAllWebsitesForUser);
exports.default = router;
//# sourceMappingURL=website.routes.js.map