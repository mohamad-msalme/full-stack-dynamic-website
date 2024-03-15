"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const targetAudience_controller_1 = require("../controllers/targetAudience.controller");
const auth_middleware_1 = require("../middlewares/auth.middleware");
const router = express_1.default.Router();
router.post('/new', auth_middleware_1.authenticateUser, targetAudience_controller_1.createTargetAudience);
router.get('/', auth_middleware_1.authenticateUser, targetAudience_controller_1.getAllTargetAudiences);
exports.default = router;
//# sourceMappingURL=targetAudience.routes.js.map