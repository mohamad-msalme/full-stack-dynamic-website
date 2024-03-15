"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const auth_middleware_1 = require("../middlewares/auth.middleware");
const auth_controller_1 = require("../controllers/auth.controller");
const router = express_1.default.Router();
router.post("/logout", auth_middleware_1.authenticateUser, auth_controller_1.logout);
router.post('/register', auth_controller_1.register);
router.post('/login', auth_controller_1.login);
router.get('/check-auth', auth_middleware_1.authenticateUser, (req, res) => {
    res.status(200).send({ success: { userId: req.userId } });
});
exports.default = router;
//# sourceMappingURL=auth.routes.js.map