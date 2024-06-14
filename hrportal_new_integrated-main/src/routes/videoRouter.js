import express from 'express';
import {uploadVideo} from '../middleware/multer.middleware.js';
import { uploadVideoController
       ,deleteVideoController,
       getVideosController
    } from '../controllers/videoController.js';



const router = express.Router();

router.post('/upload', uploadVideo.single('video'),uploadVideoController);
router.get('/recent-videos/:empid', getVideosController);
router.delete('/delete/:_id',  deleteVideoController);
export default router;