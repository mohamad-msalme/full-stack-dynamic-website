import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import User from '../models/user.model';

export const logout = (_req: Request, res: Response) => {
    try {
        // Clear the token cookie
        res.clearCookie('token');

        return res.status(200).send({
            success: {
                message: "Logout successful"
            }
        });
    } catch (error) {
        console.error('Error logging out:', error);
        return res.status(500).send({
            error: {
                message: "An error occurred while logging out"
            }
        });
    }
};

export const register = async (req: Request, res: Response) => {
    const { username, email, password } = req.body;

    try {
        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create a new user
        const newUser = new User({
            username,
            email,
            password: hashedPassword
        });

        // Save the user to the database
        await newUser.save();

        res.status(200).send({
            success: {
                data: newUser
            }
        });
    } catch (error) {
        console.error('Error registering user:', error);
        res.status(500).send({
            error: {
                message:"An error occurred while registering user"
            }
        });
    }
};

export const login = async (req: Request, res: Response) => {
    const { email, password } = req.body;
    console.log("first")
    try {
        // Find the user by email
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(404).send({
                error: {
                    message: "User not found"
                }
            });
        }

        // Check if the password is correct
        const isPasswordValid = await bcrypt.compare(password, user.password);

        if (!isPasswordValid) {
            return res.status(401).send({
                error: {
                    message: "Invalid password"
                }
            });
        }

        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET!);

        res.cookie('token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: "strict"
        });

        return res.status(200).send({
            success: {
                data: user
            }
        });
    } catch (error) {
        console.error('Error logging in:', error);
        return res.status(500).send({
            error: {
                message: "An error occurred while login user"
            }
        });
    }
};