import fetch from 'node-fetch';
import dotenv from 'dotenv';
import FormData from 'form-data';
import fs from 'fs';
import path from 'path';
import axios from 'axios';


dotenv.config();

const OPENAI_API_KEY = process.env.OPENAI_API_KEY;


const getModels = async () => {
    try {
        const response = await fetch(
            'https://api.groq.com/openai/v1/models',
            {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${OPENAI_API_KEY}`,
                    'Content-Type': 'application/json'
                }
            }
        );
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }   
        const data = await response.json();
        const modelIds = data.data.map(model => ({ id: model.id }));
        console.log(modelIds);
        return { models: modelIds };
    } catch (error) {
        console.error('Error fetching models:', error);
        throw error;
    }
};


 const sendMessage = async (empid, message, modelType) => {
    console.log(message, modelType);
    try {
        const response = await fetch(
            'https://api.groq.com/openai/v1/chat/completions',
            {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${OPENAI_API_KEY}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    model: modelType || 'text-davinci-003', // Default to a specific model if not provided
                    messages : [
                      {
                        role: "user",
                        content: message,
                      },
                    ],
                    max_tokens: 200, 
                    n: 1,
                    stop: null,
                    temperature: 0.7 
                })
            }
        );

        const responseData = await response.json();
        console.log(responseData);
        if (responseData.choices && responseData.choices.length > 0) {
            const text = responseData.choices[0].message.content;
            return text;
        } else {
            throw new Error('No choices returned from OpenAI');
        }

    } catch (error) {
        console.error('Error communicating with OpenAI:', error);
        throw new Error('Failed to communicate with OpenAI');
    }
};

const sentpdfToNim = async (file) => {
    try {
      const form = new FormData();
      const baseDir = process.cwd();
      const filePath = path.join(baseDir, file.path);
      form.append('files', fs.createReadStream(filePath), {
        filename: file.originalname,
        contentType: file.mimetype,
      });
      const response = await axios.post(`http://55.55.54.236:8000/upload_pdf`, form, {
        headers: {
          ...form.getHeaders()
        }
      });
      if(!response){
        throw new Error(`responce is not send from model: ${response.status}`);
      }
      console.log(response.data);
      return response.data;
    } catch (error) {
      console.error('Error uploading PDF:', error.message);
      throw error;
    }
  };

const sendMessageToNim = async (question) => {
      try {
       
  
      const response = await axios.post(`http://55.55.54.236:8000/ask_question`, {
        "question": question,
      } , {
          headers: {
               'Content-Type': 'application/json',
               'Access-Control-Allow-Origin': '*',
          }
        });
        if(!response){
          throw new Error(`responce is not send from model: ${response.status}`);
        }
        console.log(response);
        return response.data.response;
        
      } catch (error) {
       throw error;    
      }

}


export {
    sendMessage,
    getModels,
    sentpdfToNim,
    sendMessageToNim
}