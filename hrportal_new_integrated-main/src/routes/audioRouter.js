import express from 'express';
import {uploadAudio} from '../middleware/multer.middleware.js';
import {uploadAudioController,getAudiosController} from '../controllers/audioController.js';



const router = express.Router();

router.post('/upload', uploadAudio.single('audio'),uploadAudioController);
router.get('/recent-audios/:empid', getAudiosController);

export default router;