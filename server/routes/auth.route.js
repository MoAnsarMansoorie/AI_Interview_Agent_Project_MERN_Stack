import express from 'express';
import { googleAuthController, logoutController } from '../controllers/auth.controller.js';
import { authLimiter } from '../middlewares/rateLimit.js';

const router = express.Router();

router.post("/google", authLimiter, googleAuthController);
router.get("/logout", logoutController);

export default router;