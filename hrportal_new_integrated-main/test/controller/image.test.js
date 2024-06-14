import { describe, it, expect, vi } from 'vitest';
import { uploadImageController, deleteImageController, getRecentImageController } from '../../src/controllers/imageController.js';
import { uploadImage, deleteImage, getRecentImage } from '../../src/service/imageService.js';
import ApiResponse from '../../src/utils/apiResponse.js';

vi.mock('../../src/service/imageService.js');
vi.mock('../../src/utils/apiResponse.js', () => {
    return vi.fn().mockImplementation((status, data, message) => {
        return { status, data, message };
    });
});

describe('Image Controllers', () => {
    describe('uploadImageController', () => {
        it('should upload an image successfully', async () => {
            const req = {
                body: { empid: '123' },
                file: { originalname: 'test.jpg', path: '/path/to/test.jpg' }
            };
            const res = { status: vi.fn().mockReturnThis(), json: vi.fn() };
            const uploadedImage = { empid: '123', image: { _id: '1', originalname: 'test.jpg', path: 'url' } };

            uploadImage.mockResolvedValue(uploadedImage);

            await uploadImageController(req, res);

            expect(res.status).toHaveBeenCalledWith(201);
            expect(res.json).toHaveBeenCalledWith(new ApiResponse(201, uploadedImage, "User Image uploaded successfully."));
        });

        it('should handle errors during image upload', async () => {
            const req = { body: { empid: '123' }, file: { originalname: 'test.jpg', path: '/path/to/test.jpg' } };
            const res = { status: vi.fn().mockReturnThis(), json: vi.fn() };
            const error = new Error('Image upload failed');

            uploadImage.mockRejectedValue(error);

            await uploadImageController(req, res);

            expect(res.status).toHaveBeenCalledWith(400);
            expect(res.json).toHaveBeenCalledWith(new ApiResponse(400, null, error.message));
        });
    });

    describe('deleteImageController', () => {
        it('should delete an image successfully', async () => {
            const req = { params: { _id: '1' } };
            const res = { status: vi.fn().mockReturnThis(), json: vi.fn() };

            deleteImage.mockResolvedValue();

            await deleteImageController(req, res);

            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith(new ApiResponse(200, null, 'Image deleted successfully'));
        });

        it('should handle errors during image deletion', async () => {
            const req = { params: { _id: '1' } };
            const res = { status: vi.fn().mockReturnThis(), json: vi.fn() };
            const error = new Error('Failed to delete image');

            deleteImage.mockRejectedValue(error);

            await deleteImageController(req, res);

            expect(res.status).toHaveBeenCalledWith(500);
            expect(res.json).toHaveBeenCalledWith(new ApiResponse(500, null, error.message));
        });
    });

    describe('getRecentImageController', () => {
        it('should retrieve recent images successfully', async () => {
            const req = { params: { empid: '123' } };
            const res = { status: vi.fn().mockReturnThis(), json: vi.fn() };
            const recentImages = [{ _id: '1', empid: '123', path: 'url1' }, { _id: '2', empid: '123', path: 'url2' }];

            getRecentImage.mockResolvedValue(recentImages);

            await getRecentImageController(req, res);

            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith(new ApiResponse(200, recentImages, 'Recent images retrieved successfully'));
        });

        it('should handle errors during recent images retrieval', async () => {
            const req = { params: { empid: '123' } };
            const res = { status: vi.fn().mockReturnThis(), json: vi.fn() };
            const error = new Error('Failed to retrieve recent images');

            getRecentImage.mockRejectedValue(error);

            await getRecentImageController(req, res);

            expect(res.status).toHaveBeenCalledWith(500);
            expect(res.json).toHaveBeenCalledWith(new ApiResponse(500, null, error.message));
        });
    });
});
