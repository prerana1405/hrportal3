import upload from '../middleware/multer.middleware.js';
import express from 'express';
import {uploadImage,deleteImage,getRecentImagesHandler} from '../controllers/multimageController.js';
const router = express.Router();
router.post('/upload', upload.single('image'), uploadImage);//upload& fetch
router.get('/recent-images', getRecentImagesHandler); 
router.delete('/', deleteImage); 
export default router;