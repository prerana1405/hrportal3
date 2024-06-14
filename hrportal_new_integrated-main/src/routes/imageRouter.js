import express from 'express';
import {upload} from '../middleware/multer.middleware.js';
import { uploadImageController,
         deleteImageController,
         getRecentImageController     
} from '../controllers/imageController.js';


const router = express.Router();

router.post('/upload', upload.single('image'), uploadImageController);
router.delete('/delete-image/:_id', deleteImageController);
router.get('/recent-images/:empid', getRecentImageController);

export default router;