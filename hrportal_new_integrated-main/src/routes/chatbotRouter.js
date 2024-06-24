import express from "express";
import { sendMessageToChatbotController,
    getModelsController,
    sendPdfToNimRagController,
    sendMessageToNimRagController
 } from "../controllers/chatbotController.js";

 import { uploadPdf } from "../middleware/multer.middleware.js";

const router = express.Router();

router.post('/message',sendMessageToChatbotController);
router.get('/models',getModelsController)

router.post('/nim/pdf', uploadPdf.single('pdf'),sendPdfToNimRagController);
router.post('/nim',sendMessageToNimRagController);

export default router;
