"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.login = exports.register = exports.logout = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const user_model_1 = __importDefault(require("../models/user.model"));
const logout = (_req, res) => {
    try {
        res.clearCookie('token');
        return res.status(200).send({
            success: {
                message: "Logout successful"
            }
        });
    }
    catch (error) {
        console.error('Error logging out:', error);
        return res.status(500).send({
            error: {
                message: "An error occurred while logging out"
            }
        });
    }
};
exports.logout = logout;
const register = async (req, res) => {
    const { username, email, password } = req.body;
    try {
        const hashedPassword = await bcryptjs_1.default.hash(password, 10);
        const newUser = new user_model_1.default({
            username,
            email,
            password: hashedPassword
        });
        await newUser.save();
        res.status(200).send({
            success: {
                data: newUser
            }
        });
    }
    catch (error) {
        console.error('Error registering user:', error);
        res.status(500).send({
            error: {
                message: "An error occurred while registering user"
            }
        });
    }
};
exports.register = register;
const login = async (req, res) => {
    const { email, password } = req.body;
    console.log("first");
    try {
        const user = await user_model_1.default.findOne({ email });
        if (!user) {
            return res.status(404).send({
                error: {
                    message: "User not found"
                }
            });
        }
        const isPasswordValid = await bcryptjs_1.default.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).send({
                error: {
                    message: "Invalid password"
                }
            });
        }
        const token = jsonwebtoken_1.default.sign({ userId: user._id }, process.env.JWT_SECRET);
        res.cookie('token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict'
        });
        return res.status(200).send({
            success: {
                data: user
            }
        });
    }
    catch (error) {
        console.error('Error logging in:', error);
        return res.status(500).send({
            error: {
                message: "An error occurred while login user"
            }
        });
    }
};
exports.login = login;
//# sourceMappingURL=auth.controller.js.map