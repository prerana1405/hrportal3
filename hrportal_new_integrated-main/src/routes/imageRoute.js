import upload from '../middleware/multer.middleware.js';
import express from 'express';
import {uploadImage,deleteImage} from '../controllers/imageController.js';


const router = express.Router();
router.post('/profile-image', upload.single('image'), uploadImage);
router.delete('/', deleteImage);

export default router;