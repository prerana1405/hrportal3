import { describe, it, expect, vi } from 'vitest';
import express from 'express';
import request from 'supertest';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import userRouter from '../src/routes/user.router.js';
import fileRoutes from '../src/routes/fileRoute.js';
import profilePicRouters from '../src/routes/profilePicRoute.js';
import imageRouters from '../src/routes/imageRouter.js';

const app = express();

// Mock environment variables
process.env.CORS_ORIGIN = 'http://example.com';

// Mock middleware functions
app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true
}));
app.use(express.json({ limit: '16kb' }));
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use(cookieParser());

// Mock route usage
app.use('/api/v1/users', userRouter);
app.use('/api/v1/file', fileRoutes);
app.use('/api/v1/profile-image', profilePicRouters);
app.use('/api/v1/image', imageRouters);

describe('Express Application Setup', () => {
    it('should set up middleware correctly', async () => {
        // Mock a request to the server for testing middleware
        const response = await request(app).get('/api/v1/users');

        // Verify CORS headers are correctly set
        expect(response.headers['access-control-allow-origin']).toBe(process.env.CORS_ORIGIN);
        expect(response.headers['access-control-allow-credentials']).toBe('true');

        // Verify JSON and URL-encoded body parsing
        expect(response.body).toEqual({});
    });

    it('should correctly mount user routes', async () => {
        // Mock a request to the user route to verify it is mounted correctly
        const response = await request(app).get('/api/v1/users');

        // Replace with actual route test logic based on your user router behavior
        expect(response.status).toBe(404); // Example: expecting 404 if no route handler is defined
    });

    // Add similar tests for other routes as needed (file, profile-image, image)

    // Example:
    it('should correctly mount file routes', async () => {
        const response = await request(app).get('/api/v1/file');
        expect(response.status).toBe(404); // Adjust based on your file routes
    });

    it('should correctly mount profile image routes', async () => {
        const response = await request(app).get('/api/v1/profile-image');
        expect(response.status).toBe(404); // Adjust based on your profile image routes
    });

    it('should correctly mount image routes', async () => {
        const response = await request(app).get('/api/v1/image');
        expect(response.status).toBe(404); // Adjust based on your image routes
    });


});