import express from 'express';
import * as datasetController from '../controllers/dataset.controller.js';
import authMiddleware from '../middlewares/auth.middleware.js';

const router = express.Router();

// Dataset Routes (Protected - Requires Authentication)
router.post('/datasets/upload', authMiddleware.authenticate, datasetController.uploadDataset, datasetController.processUpload);
router.get('/datasets/search', authMiddleware.authenticate, datasetController.searchDataset);
router.get('/datasets/download/:datasetId', authMiddleware.authenticate, datasetController.downloadDataset);

export default router;
