import express from 'express';
import { isAuth } from '../middlewares/isAuth.js';
import { getUserController } from '../controllers/user.controller.js';

const router = express.Router();

// Example route for user registration
router.get("/current-user", isAuth, getUserController)

export default router;