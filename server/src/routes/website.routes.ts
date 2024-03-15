import express from 'express';
import { createWebsite, getAllWebsitesForUser } from '../controllers/website.controller';
import { authenticateUser } from '../middlewares/auth.middleware';

const router = express.Router();

// Route to create a new website
router.post('/new', authenticateUser, createWebsite);

// Route to get all websites for a specific user
router.get('/', authenticateUser, getAllWebsitesForUser);

export default router;