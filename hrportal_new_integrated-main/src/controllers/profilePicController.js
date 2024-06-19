const profilePicService = require('../service/profilePicService');
const ApiResponse = require('../utils/apiResponse');

const uploadMultiImageController = async (req, res) => {
    const { empid } = req.body;
    try {
        const image = req.file;
        const imageData =  await profilePicService.uploadProfileImage(image, empid);
        res.json(new ApiResponse(201, { image: imageData }, 'Image uploaded successfully'));
    } catch (error) {
        console.error('Error uploading file:', error.message);
        res.json(new ApiResponse(500, null, error.message));
    }
};

const deleteMultiImageController = async (req, res) => {
    const { empid } = req.params;
    console.log(empid);
    try {
        await profilePicService.deleteProfileImages(empid);
        res.json(new ApiResponse(200, null, 'Image deleted successfully'));
    } catch (error) {
        console.error('Error deleting image:', error.message);
        res.json(new ApiResponse(500, null, error.message));
    }
};

//change the name 
const getImagesController = async (req, res) => {
    const { empid } = req.params;
    try {
        const recentImages = await profilePicService.getAllProfileImages(empid);
        res.json(new ApiResponse(200, recentImages, 'Recent images retrieved successfully'));
    } catch (error) {
        console.error('Error fetching recent images:', error.message);
        res.json(new ApiResponse(500, null, error.message));
    }
};

const getProfilePictureController = async (req, res) => {
    const { empid } = req.params;
    try {
        const recentImages = await profilePicService.getRecentProfileImage(empid);
        res.json(new ApiResponse(200, recentImages, 'Recent images retrieved successfully'));
    } catch (error) {
        console.error('Error fetching recent images:', error.message);
        res.json(new ApiResponse(500, null, error.message));
    }
};

module.exports = {
    uploadMultiImageController,
    deleteMultiImageController,
    getImagesController,
    getProfilePictureController
};