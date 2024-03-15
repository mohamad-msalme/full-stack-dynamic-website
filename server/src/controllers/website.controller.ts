// website.controller.ts

import TargetAudience from '../models/targetAudience.model';
import Website from '../models/website.model';
import { generateWebsite } from '../utils/generateWebsite'; // Import the generateWebsite function
import { Request, Response } from 'express';

// Function to create a new website
export const createWebsite = async (req: Request, res: Response) => {
        const { websiteName, websiteDescription, targetAudienceId } = req.body;
        
        try {
          // Check if required data is provided
          if (!websiteName || !websiteDescription || !targetAudienceId) {
            return res.status(400).json({ error: {message: 'Missing required data'} });
          }
      
          // Fetch target audience by ID
          const targetAudience = await TargetAudience.findById(targetAudienceId);
          if (!targetAudience) {
            return res.status(404).json({ error: {message: 'Target audience not found'} });
          }
      
          // Generate website content
          const content = await generateWebsite(websiteName, websiteDescription, targetAudience.name);
          console.log({content})
          // Create new website document
          const newWebsite = new Website({
            user: req.userId,
            websiteName,
            websiteDescription,
            targetAudience: targetAudience._id, // Use the target audience ID
            content
          });
          
          // Save new website to database
          await newWebsite.save();
          
         return  res.status(201).json({success: {data: newWebsite}});
        } catch (error) {
          console.error('Error creating website:', error);
          return res.status(500).json({ error: { message:'Server error'}});
        }
      };

// Function to get all websites for a specific user
export const getAllWebsitesForUser = async (req: Request, res: Response) => {
        try {
          const userId = req.userId; // Get user ID from token
          
          // Fetch all websites for the user and populate the targetAudience field
          const websites = await Website.find({ user: userId }).populate('targetAudience').sort({ _id: -1 }); // Sort by _id field in descending order

      
          // Send the websites array with populated targetAudience field to the frontend
          res.status(200).json({ success: { data: websites }});
        } catch (error) {
          console.error('Error getting websites for user:', error);
          res.status(500).json({ error: { message:'Server error'}});
        }
      };