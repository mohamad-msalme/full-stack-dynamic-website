"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authenticateUser = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const authenticateUser = (req, res, next) => {
    try {
        console.log(req.cookies);
        const token = req.cookies.token;
        if (!token) {
            return res.status(401).send({ error: {
                    message: "Unauthorized"
                } });
        }
        const decoded = jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET);
        req.userId = decoded.userId;
        return next();
    }
    catch (error) {
        console.error('Error authenticating user:', error);
        res.status(401).send({ error: {
                message: "Unauthorized"
            } });
    }
};
exports.authenticateUser = authenticateUser;
//# sourceMappingURL=auth.middleware.js.map