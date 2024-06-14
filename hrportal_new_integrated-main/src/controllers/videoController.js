import {uploadVideo
       ,deleteVideo,
       getRecentVideo
} from '../service/videoService.js';
import { ApiResponse } from '../utils/apiResponse.js';

const uploadVideoController = async (req, res) => {

    try {
        const {empid} = req.body;
        const video = req.file; 
        console.log(video);
        const videoData = await uploadVideo(empid,video);
      res.json(new ApiResponse(201,  videoData , 'video uploaded successfully.'));
    } catch (error) {
        console.error('Error uploading video:', error.message);
       res.json(new ApiResponse(400, null, error.message));
    }
};

const deleteVideoController = async (req, res) => {
   
    const { _id } = req.params;
    console.log(_id);
    try {
        await deleteVideo(_id);
        res.json(new ApiResponse(200, null, 'Video deleted successfully'));
    } catch (error) {
        console.error('Error deleting video:', error.message);
        res.json(new ApiResponse(500, null, error.message));
    }
};

 const getVideosController = async (req, res) => {
    const { empid } = req.params;
    try {
        const recentVideos = await getRecentVideo(empid);
        res.json(new ApiResponse(200, recentVideos, 'Recent videos retrieved successfully'));
    } catch (error) {
        console.error('Error fetching recent videos:', error);
        res.json(new ApiResponse(500, null, 'Failed to retrieve recent videos'));
    }
};
export{
    uploadVideoController,
    deleteVideoController,
    getVideosController
}