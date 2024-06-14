import {uploadImageOnCloudinary,
    deleteImageOnCloudinary,
    getImages,
    getRecentProfileImage} from '../service/profilePicService.js';
import { ApiResponse } from '../utils/apiResponse.js';


export const uploadMultiImageController = async (req, res) => {
    const { empid } = req.body;
    try {
        const image = req.file;
        const imageData =  await uploadImageOnCloudinary(image, empid);
        res.json(new ApiResponse(201, { image: imageData }, 'Image uploaded successfully'));
    } catch (error) {
        console.error('Error uploading file:', error.message);
        res.json(new ApiResponse(500, null, error.message));
    }
};


export const deleteMultiImageController = async (req, res) => {
   
    const { empid } = req.params;
    console.log(empid);
    try {
        await deleteImageOnCloudinary(empid);
        res.json(new ApiResponse(200, null, 'Image deleted successfully'));
    } catch (error) {
        console.error('Error deleting image:', error.message);
        res.json(new ApiResponse(500, null, error.message));
    }
};


export const getImagesController = async (req, res) => {
    const { empid } = req.params;
    try {
        const recentImages = await getImages(empid);
        res.json(new ApiResponse(200, recentImages, 'Recent images retrieved successfully'));
    } catch (error) {
        console.error('Error fetching recent images:', error.message);
        res.json(new ApiResponse(500, null, error.message));
    }
};


export const getProfilePictureController = async (req, res) => {
    const { empid } = req.params;
    try {
        const recentImages = await getRecentProfileImage(empid);
        res.json(new ApiResponse(200, recentImages, 'Recent images retrieved successfully'));
    } catch (error) {
        console.error('Error fetching recent images:', error.message);
        res.json(new ApiResponse(500, null, error.message));
    }
}

