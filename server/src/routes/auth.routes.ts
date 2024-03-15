import express from 'express';
import { authenticateUser } from '../middlewares/auth.middleware';
import { register, login, logout } from '../controllers/auth.controller';

const router = express.Router();

router.post("/logout",authenticateUser, logout )
router.post('/register', register);
router.post('/login', login);
router.get('/check-auth', authenticateUser, (req, res) => {
        // If the middleware successfully attaches the user ID to the request object,
        // it means the user is authenticated
        res.status(200).send({ success: {userId: req.userId}});
});

export default router;