import express from 'express';
import * as billingController from '../controllers/billing.controller.js';
import authMiddleware from '../middlewares/auth.middleware.js';

const router = express.Router();

router.get('/billing', billingController.getBillDeails);
router.post('/billing', billingController.addBillDetails);
router.get('/billing/last', billingController.getLastBillDetails);
router.get('/billing/:id', billingController.getBillDeailsById);


export default router;
