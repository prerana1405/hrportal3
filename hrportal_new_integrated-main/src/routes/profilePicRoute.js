import {upload} from '../middleware/multer.middleware.js';
import express from 'express';
import {uploadMultiImageController,deleteMultiImageController,getImagesController
        ,getProfilePictureController
} from '../controllers/profilePicController.js';

const router = express.Router();

router.post('/upload', upload.single('image'), uploadMultiImageController);//upload& fetch
router.get('/recent-images/:empid', getImagesController);
router.get('/:empid', getProfilePictureController);  
router.delete('/delete-image/:empid', deleteMultiImageController); 
export default router;