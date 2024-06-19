const images = require("../models/image.models.js");
const cloudinary = require('../utils/cloudinary.js');

const uploadImage = async (empid, image) => {
    const filename = image.originalname;
    if (!empid || typeof empid !== 'string') {
        throw new Error('Invalid or missing employee ID');
    }
    if (!image || !image.path || !image.originalname) {
        throw new Error('Invalid image parameters');
    }

    try {
        const uploadImageOnCloudinary = await cloudinary.uploader.upload(image.path, {
            folder: 'Images',
            resource_type: "auto"
        });

        const newImage = new images({
            path: uploadImageOnCloudinary.secure_url,
            filename: filename,
            empid: empid,
            cloudinary_id: uploadImageOnCloudinary.public_id,
            uploadedAt: new Date()
        });

        const savedImage = await newImage.save();

        if (!savedImage || !savedImage._id) {
            throw new Error('Failed to save the image');
        }

        const data = {
            empid: empid,
            image: {
                _id: savedImage._id,
                originalname: filename,
                path: uploadImageOnCloudinary.secure_url,
            }
        };

        console.log('Image Uploaded Successfully');
        return data;

    } catch (error) {
        console.error('Error uploading image to Cloudinary:', error.message);
        throw new Error('Image upload failed');
    }
};


const deleteImage = async (_id) => {
    if (!_id) {
        throw new Error('Invalid parameter');
    }

    const image = await images.findOne({ _id: _id });
    if (!image) {
        throw new Error('Image not found');
    }

    console.log(image);
    const deleteImageFromCloudinary = await cloudinary.uploader.destroy(image.cloudinary_id);
    if (!deleteImageFromCloudinary) {
        throw new Error('Failed to delete image from Cloudinary');
    }

    const deletedImage = await images.deleteOne({ _id: _id });
    if (!deletedImage) {
        throw new Error('Failed to delete image from database');
    }

    console.log('Image deleted successfully');
    return;
};


const getRecentImage = async (empid, limit = 6) => {
    try {
        const recentImages = await images.find({ empid })
            .sort({ uploadedAt: -1 })
            .limit(limit);
        console.log(recentImages);
        return recentImages;
    } catch (error) {
        console.error('Error retrieving recent images from the database:', error.message);
        throw new Error('Failed to retrieve recent images');
    }
};

module.exports = {
    uploadImage,
    deleteImage,
    getRecentImage
};