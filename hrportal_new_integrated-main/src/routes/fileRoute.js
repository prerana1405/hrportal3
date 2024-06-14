import express from 'express';
import {upload} from '../middleware/multer.middleware.js';
import {uploadFile,deleteFile,getFiles} from '../controllers/fileController.js';

const router = express.Router();
//upload docs
router.post('/upload', upload.single('file'), uploadFile);
router.get('/get-files/:empid', getFiles);
router.delete('/delete-file/:_id', deleteFile);//  pagination pending

export default router;