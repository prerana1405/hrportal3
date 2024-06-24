import {ApiResponse} from '../utils/apiResponse.js';
import { sendMessage,
         getModels,
         sentpdfToNim,
         sendMessageToNim
} from '../service/chatbotService.js';


  const getModelsController = async (req, res) => {
    try {
      const modelResponse =  await getModels();
      res.json(new ApiResponse(200, modelResponse, 'Message sent and response received successfully'));
    } catch (error) {
        console.error('Error sending message to chatbot:', error);
        res.status(500).json(new ApiResponse(500, null, 'Failed to send message to chatbot'));
    }
  };


 const sendMessageToChatbotController = async (req, res) => {
    const {empid, message, modelType } = req.body;

    try {
      const chatbotResponse =  await sendMessage(empid, message, modelType);
      res.json(new ApiResponse(200, chatbotResponse, 'Message sent and response received successfully'));
    } catch (error) {
        console.error('Error sending message to chatbot:', error);
        res.status(500).json(new ApiResponse(500, null, 'Failed to send message to chatbot'));
    }
};


const sendPdfToNimRagController = async (req , res) => {
   try {
    const File = req.file;
    console.log(File);
  const data = await sentpdfToNim(req.file);
   res.json(new ApiResponse(200, data, 'pdf Upload successfully'));
  } catch (error) {
      console.log('Error sending message to NimApi Model:', error.message);
      res.status(500).json(new ApiResponse(500, null, 'Failed  to upload pdf to NIM Model'));
  }

}

const sendMessageToNimRagController = async (req , res) => {
      try {
        const { question } = req.body;
        console.log(req.body);
      const resultMassage = await sendMessageToNim(question);
      res.json(new ApiResponse(200, resultMassage, 'Message sent and response received successfully'));
      } catch (error) {
        console.log('Error sending message from NIM model:', error.message);
        res.status(500).json(new ApiResponse(500, null, 'Failed to send message  from NIM model'));
        
      }
};

export { sendMessageToChatbotController,
        getModelsController,
        sendPdfToNimRagController,
        sendMessageToNimRagController
 };