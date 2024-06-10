import express from 'express';
import upload from '../middleware/multer.middleware.js';
import {uploadFile,deleteFile} from '../controllers/fileController.js';

const router = express.Router();
//upload docs
router.post('/upload', upload.single('file'), uploadFile);
router.delete('/', deleteFile);

export default router;