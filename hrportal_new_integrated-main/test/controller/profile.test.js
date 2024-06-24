import { describe, it, expect, vi } from 'vitest';
import { uploadMultiImageController ,deleteMultiImageController ,getImagesController ,getProfilePictureController } from '../../src/controllers/profilePicController.js';
import { uploadImageOnCloudinary ,deleteImageOnCloudinary ,getImages ,getRecentProfileImage } from '../../src/service/profilePicService.js'; // Import uploadImageOnCloudinary function
import {ApiResponse} from '../../src/utils/apiResponse.js';

vi.mock('../../src/service/profilePicService.js'); // Mock the uploadImageOnCloudinary function

describe('uploadMultiImageController', () => {
    it('should upload an image successfully', async () => {
        const empid = '123';
        const req = {
            body: { empid },
            file: { originalname: 'test.jpg', path: '/path/to/test.jpg' }
        };
        const res = {
            json: vi.fn(),
            status: vi.fn().mockReturnThis()
        };

        // Mock successful uploadImageOnCloudinary response
        const imageData = { _id: '1', originalname: 'test.jpg', path: 'url1' };
        uploadImageOnCloudinary.mockResolvedValue(imageData);

        await uploadMultiImageController(req, res);

        // Verify the response
        expect(res.json).toHaveBeenCalledWith(new ApiResponse(201, { image: imageData }, 'Image uploaded successfully'));
    });

    it('should handle errors during image upload', async () => {
        const empid = '123';
        const req = {
            body: { empid },
            file: { originalname: 'test.jpg', path: '/path/to/test.jpg' }
        };
        const res = {
            json: vi.fn(),
            status: vi.fn().mockReturnThis()
        };

        // Mock error in uploadImageOnCloudinary function
        const error = new Error('Failed to upload image');
        uploadImageOnCloudinary.mockRejectedValue(error);

        await uploadMultiImageController(req, res);

        // Verify the error response
        expect(res.json).toHaveBeenCalledWith(new ApiResponse(500, null, 'Failed to upload image'));
    });
});


describe('deleteMultiImageController', () => {
    it('should delete an image successfully', async () => {
        const empid = '123';
        const req = {
            params: { empid }
        };
        const res = {
            json: vi.fn(),
            status: vi.fn().mockReturnThis()
        };

        deleteImageOnCloudinary.mockResolvedValue();

        await deleteMultiImageController(req, res);

        expect(res.json).toHaveBeenCalledWith(new ApiResponse(200, null, 'Image deleted successfully'));
    });

    it('should handle errors during image deletion', async () => {
        const empid = '123';
        const req = {
            params: { empid }
        };
        const res = {
            json: vi.fn(),
            status: vi.fn().mockReturnThis()
        };

        const error = new Error('Failed to delete image');
        deleteImageOnCloudinary.mockRejectedValue(error);

        await deleteMultiImageController(req, res);

        expect(res.json).toHaveBeenCalledWith(new ApiResponse(500, null, 'Failed to delete image'));
    });
});


describe('getImagesController', () => {
    it('should retrieve recent images successfully', async () => {
        const empid = '123';
        const req = {
            params: { empid }
        };
        const res = {
            json: vi.fn(),
            status: vi.fn().mockReturnThis()
        };

        const recentImages = [{ _id: '1', empid: '123', path: 'url1' }, { _id: '2', empid: '123', path: 'url2' }];
        getImages.mockResolvedValue(recentImages);

        await getImagesController(req, res);
        expect(res.json).toHaveBeenCalledWith(new ApiResponse(200, recentImages, 'Recent images retrieved successfully'));
    });

    it('should handle errors during recent images retrieval', async () => {
        const empid = '123';
        const req = {
            params: { empid }
        };
        const res = {
            json: vi.fn(),
            status: vi.fn().mockReturnThis()
        };

        const error = new Error('Failed to retrieve recent images');
        getImages.mockRejectedValue(error);

        await getImagesController(req, res);
        expect(res.json).toHaveBeenCalledWith(new ApiResponse(500, null, 'Failed to retrieve recent images'));
    });
});


describe('getProfilePictureController', () => {
    it('should retrieve recent profile image successfully', async () => {
        const empid = '123';
        const req = {
            params: { empid }
        };
        const res = {
            json: vi.fn(),
            status: vi.fn().mockReturnThis()
        };

        const recentProfileImage = { _id: '1', empid: '123', path: 'profile_url' };
        getRecentProfileImage.mockResolvedValue(recentProfileImage);

        await getProfilePictureController(req, res);
        
        expect(res.json).toHaveBeenCalledWith(new ApiResponse(200, recentProfileImage, 'Recent images retrieved successfully'));
    });

    it('should handle errors during recent profile image retrieval', async () => {
        const empid = '123';
        const req = {
            params: { empid }
        };
        const res = {
            json: vi.fn(),
            status: vi.fn().mockReturnThis()
        };

        const error = new Error('Failed to retrieve recent profile image');
        getRecentProfileImage.mockRejectedValue(error);

        await getProfilePictureController(req, res);

        expect(res.json).toHaveBeenCalledWith(new ApiResponse(500, null, 'Failed to retrieve recent profile image'));
    });
});