import express from 'express';
import getRoot from '../controllers/main.controller.js';
import * as authController from '../controllers/auth.controller.js';

const router = express.Router();

// Main Route
router.get('/', getRoot);

// Authentication Routes
router.post('/signup', authController.signup);
router.post('/login', authController.login);

export default router;
