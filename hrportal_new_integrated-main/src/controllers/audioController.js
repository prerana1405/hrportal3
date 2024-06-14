import exp from 'constants';
import {uploadAudio,getRecentAudio} from '../service/audioService.js';
import { ApiResponse } from '../utils/apiResponse.js';

 const uploadAudioController = async (req, res) => {
    const {empid} = req.body;
    const audio = req.file; 
    try {
        if (!audio|| !empid) {
            return res.status(400).send('No audiofile  or empid uploaded');
        }
        const audioData = await uploadAudio(audio, empid);
        res.json(new ApiResponse(201, { audio: audioData }, 'audio uploaded successfully'));
    } catch (error) {
        console.error('Error uploading audio:', error.message);
        res.json(new ApiResponse(500, null, error.message));
    }
};

const getAudiosController= async (req, res) => {
    const { empid } = req.params;
    try {
        const recentAudios = await getRecentAudio(empid);
        res.json(new ApiResponse(200, recentAudios , 'Recent Audios retrieved successfully'));
    } catch (error) {
        console.error('Error fetching recent Audios:', error);
        res.json(new ApiResponse(500, null, 'Failed to retrieve recent Audios'));
    }
};

export{
    uploadAudioController,
    getAudiosController
}