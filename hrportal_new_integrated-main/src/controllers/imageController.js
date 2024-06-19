const imageService = require('../service/imageService');
const ApiResponse = require('../utils/apiResponse');

const uploadImageController = async (req, res) => {
    try {  
        const { empid } = req.body;
        const image = req.file;
        const Image = await imageService.uploadImage(empid, image);
        return res.status(201).json(new ApiResponse(201, Image, "User Image successfully."));
    } catch (error) {
        return res.status(400).json(new ApiResponse(400, null, error.message));
    }
};

const deleteImageController = async (req, res) => {
    const { _id } = req.params;
    console.log(_id);
    try {
        await imageService.deleteImage(_id);
        res.json(new ApiResponse(200, null, 'Image deleted successfully'));
    } catch (error) {
        console.error('Error deleting image:', error.message);
        res.json(new ApiResponse(500, null, error.message));
    }
};

const getRecentImageController = async (req, res) => {
    const { empid } = req.params;
    try {
        const recentImages = await imageService.getRecentImage(empid);
        res.json(new ApiResponse(200, recentImages, 'Recent images retrieved successfully'));
    } catch (error) {
        console.error('Error fetching recent images:', error);
        res.json(new ApiResponse(500, null, 'Failed to retrieve recent images'));
    }
};

module.exports = {
    uploadImageController,
    deleteImageController,
    getRecentImageController,
};