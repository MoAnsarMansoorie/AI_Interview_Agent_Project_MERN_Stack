import express from 'express';
import { googleAuthController, logoutController } from '../controllers/auth.controller.js';

const router = express.Router();

router.post("/google", googleAuthController);
router.get("/logout", logoutController);

export default router;