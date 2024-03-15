// targetAudience.controller.ts

import { Request, Response } from 'express';
import TargetAudience from '../models/targetAudience.model';

// Function to create a new target audience
export const createTargetAudience = async (req: Request, res: Response) => {
  const { name } = req.body;

  try {
    const existingAudience = await TargetAudience.findOne({ name });
    if (existingAudience) {
      return res.status(400).json({error: { message: 'Target audience already exists' }});
    }

    const newAudience = new TargetAudience({ name });
    await newAudience.save();

    return res.status(201).json({success: {data: newAudience}});
  } catch (error) {
    console.error(error);
    return res.status(500).json({error: {message: 'Server error'}});
  }
};

// Function to get all target audiences
export const getAllTargetAudiences = async (_req: Request, res: Response) => {
  try {
    const audiences = await TargetAudience.find();
    return res.status(200).json({success: {
        data: audiences
    } });
  } catch (error) {
    console.error(error);
    return res.status(500).json({error: {message: 'Server error'}});
  }
};
