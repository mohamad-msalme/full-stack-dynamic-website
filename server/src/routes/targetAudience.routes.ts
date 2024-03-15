import express from 'express';
import { createTargetAudience, getAllTargetAudiences } from '../controllers/targetAudience.controller';
import { authenticateUser } from '../middlewares/auth.middleware';

const router = express.Router();

// Route to create a new target audience
router.post('/new', authenticateUser, createTargetAudience);

// Route to get all target audiences
router.get('/',authenticateUser, getAllTargetAudiences);

export default router;