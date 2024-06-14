import { describe, it, expect, vi } from 'vitest';
import { registerUserController,
    loginUserController,
    sendVerificationMailController,
    verifyEmailTokenController ,
    updateProfileController,
    updatePasswordController
} from '../../src/controllers/user.controller.js';
import { registerUser ,loginUser ,sendVerificationMail ,verifyEmailToken ,updateProfile ,updatePassword } from '../../src/service/userService.js';
import { ApiResponse } from '../../src/utils/apiResponse.js';

vi.mock('../../src/service/userService.js'); // Mock the registerUser function
describe('registerUserController', () => {
    it('should return 201 when user is registered successfully', async () => {
        const req = {
            body: {
                fname: "Ujjwal",
                lname: "kumar",
                email: "starUjjwal29@gmail.com",
                empid: "32123",
                password: "Ujjwal@123",
                mobile_no: "1234567190"
            }
        };
        const res = {
            status: vi.fn().mockReturnThis(),
            json: vi.fn()
        };

        registerUser.mockResolvedValue({
            id: 15,
            fname: "Ujjwal",
            lname: "kumar",
            email: "starUjjwal29@gmail.com",
            empid: "32123",
            mobile_no: "1234567190"
         });

        await registerUserController(req, res);

        expect(res.status).toHaveBeenCalledWith(201);
        expect(res.json).toHaveBeenCalledWith(new ApiResponse(201, null, "User registered successfully.", true));
    });

    it('should return 400 when there is a duplicate entry error', async () => {
        const req = {
            body: {
                fname: "Ujjwal",
                lname: "kumar",
                email: "starUjjwal29@gmail.com",
                empid: "32123",
                password: "Ujjwal@123",
                mobile_no: "1234567190"
            }
        };
        const res = {
            status: vi.fn().mockReturnThis(),
            json: vi.fn()
        };
        
        const error = new Error('Duplicate entry');
        registerUser.mockRejectedValue(error);

        await registerUserController(req, res);

        expect(res.status).toHaveBeenCalledWith(400);
        expect(res.json).toHaveBeenCalledWith(new ApiResponse(400, null, 'Duplicate entry', false));
    });

    it('should return 400 for other errors', async () => {
        const req = {
            body: {
                fname: "Ujjwal",
                lname: "kumar",
                email: "starUjjwal29@gmail.com",
                empid: "32123",
                password: "Ujjwal@123",
                mobile_no: "1234567190"
            }
        };
        const res = {
            status: vi.fn().mockReturnThis(),
            json: vi.fn()
        };

        const error = new Error('Some other error');
        registerUser.mockRejectedValue(error);

        await registerUserController(req, res);

        expect(res.status).toHaveBeenCalledWith(400);
        expect(res.json).toHaveBeenCalledWith(new ApiResponse(400, null, 'Some other error', false));
    });
});

describe('loginUserController', () => {
    it('should return 200 when user is logged in successfully', async () => {
        const req = {
            body: {
                email: "starUjjwal29@gmail.com",
                password: "Ujjwal@123"
            }
        };
        const res = {
            status: vi.fn().mockReturnThis(),
            json: vi.fn()
        };

        const mockUser = {
            id: 14,
            fname: "Ujjwal",
            lname: "kumar",
            email: "starUjjwal29@gmail.com",
            empid: "32123",
            mobile_no: "1234567190"
        };

        loginUser.mockResolvedValue(mockUser);

        await loginUserController(req, res);

        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith(new ApiResponse(200, { userDetail: mockUser }, "User logged in successfully"));
    });

    it('should return 400 when there is an error', async () => {
        const req = {
            body: {
                email: "starUjjwal29@gmail.com",
                password: "Ujjwal@123"
            }
        };
        const res = {
            status: vi.fn().mockReturnThis(),
            json: vi.fn()
        };

        const error = new Error('Invalid credentials');
        loginUser.mockRejectedValue(error);

        await loginUserController(req, res);

        expect(res.status).toHaveBeenCalledWith(400);
        expect(res.json).toHaveBeenCalledWith(new ApiResponse(400, null, 'Invalid credentials'));
    });
});

describe('sendVerificationMailController', () => {
    it('should return 200 when verification email is sent successfully', async () => {
        const req = {
            body: {
                email: "starUjjwal29@gmail.com"
            }
        };
        const res = {
            status: vi.fn().mockReturnThis(),
            json: vi.fn()
        };

        sendVerificationMail.mockResolvedValue();

        await sendVerificationMailController(req, res);

        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith(new ApiResponse(200, null, "Verification email sent successfully"));
    });

    it('should return 500 when there is an error', async () => {
        const req = {
            body: {
                email: "starUjjwal29@gmail.com"
            }
        };
        const res = {
            status: vi.fn().mockReturnThis(),
            json: vi.fn()
        };

        const error = new Error('Failed to send email');
        sendVerificationMail.mockRejectedValue(error);

        await sendVerificationMailController(req, res);

        expect(res.status).toHaveBeenCalledWith(500);
        expect(res.json).toHaveBeenCalledWith(new ApiResponse(500, null, 'Failed to send email'));
    });
});

describe('verifyEmailTokenController', () => {
    it('should return 200 when email verification is successful', async () => {
        const req = {
            body: {
                email_token: "valid_token",
                email: "starUjjwal29@gmail.com"
            }
        };
        const res = {
            status: vi.fn().mockReturnThis(),
            json: vi.fn()
        };

        const mockUser = {
            id: 1,
            fname: "Ujjwal",
            lname: "kumar",
            email: "starUjjwal29@gmail.com",
            empid: "32123",
            mobile_no: "1234567190"
        };

        verifyEmailToken.mockResolvedValue(mockUser);

        await verifyEmailTokenController(req, res);

        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith(new ApiResponse(200, { userDetails: mockUser }, "Email verification successful"));
    });

    it('should return 400 when email token is invalid or expired', async () => {
        const req = {
            body: {
                email_token: "invalid_token",
                email: "starUjjwal29@gmail.com"
            }
        };
        const res = {
            status: vi.fn().mockReturnThis(),
            json: vi.fn()
        };

        verifyEmailToken.mockResolvedValue(null);

        await verifyEmailTokenController(req, res);

        expect(res.status).toHaveBeenCalledWith(400);
        expect(res.json).toHaveBeenCalledWith(new ApiResponse(400, null, "Invalid or expired email token"));
    });

    it('should return 500 when there is an error during email verification', async () => {
        const req = {
            body: {
                email_token: "some_token",
                email: "starUjjwal29@gmail.com"
            }
        };
        const res = {
            status: vi.fn().mockReturnThis(),
            json: vi.fn()
        };

        const error = new Error('Something went wrong');
        verifyEmailToken.mockRejectedValue(error);

        await verifyEmailTokenController(req, res);

        expect(res.status).toHaveBeenCalledWith(500);
        expect(res.json).toHaveBeenCalledWith(new ApiResponse(500, null, 'Something went wrong'));
    });
});


describe('updateProfileController', () => {
    it('should return 200 when profile is updated successfully', async () => {
        const req = {
            body: {
                id: 1,
                fname: "Ujjwal",
                lname: "kumar",
                mobile_no: "1234567190"
            }
        };
        const res = {
            status: vi.fn().mockReturnThis(),
            json: vi.fn()
        };

        const mockUpdatedUser = {
            id: 1,
            fname: "Ujjwal",
            lname: "kumar",
            email: "starUjjwal29@gmail.com",
            empid: "32123",
            mobile_no: "1234567190"
        };

        updateProfile.mockResolvedValue(mockUpdatedUser);

        await updateProfileController(req, res);

        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith(new ApiResponse(200, { updatedUser: mockUpdatedUser }, "Profile updated successfully"));
    });

    it('should return 500 when there is an error during profile update', async () => {
        const req = {
            body: {
                id: 1,
                fname: "Ujjwal",
                lname: "kumar",
                mobile_no: "1234567190"
            }
        };
        const res = {
            status: vi.fn().mockReturnThis(),
            json: vi.fn()
        };

        const error = new Error('Something went wrong');
        updateProfile.mockRejectedValue(error);

        await updateProfileController(req, res);

        expect(res.status).toHaveBeenCalledWith(500);
        expect(res.json).toHaveBeenCalledWith(new ApiResponse(500, null, 'Something went wrong'));
    });
});



describe('updatePasswordController', () => {
    it('should return 200 when password is updated successfully', async () => {
        const req = {
            body: {
                id: 1,
                oldPassword: "oldPass123",
                newPassword: "newPass456"
            }
        };
        const res = {
            status: vi.fn().mockReturnThis(),
            json: vi.fn()
        };

        updatePassword.mockResolvedValue();

        await updatePasswordController(req, res);

        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith(new ApiResponse(200, null, "Password updated successfully"));
    });

    it('should return 500 when there is an error during password update', async () => {
        const req = {
            body: {
                id: 1,
                oldPassword: "oldPass123",
                newPassword: "newPass456"
            }
        };
        const res = {
            status: vi.fn().mockReturnThis(),
            json: vi.fn()
        };

        const error = new Error('Something went wrong');
        updatePassword.mockRejectedValue(error);

        await updatePasswordController(req, res);

        expect(res.status).toHaveBeenCalledWith(500);
        expect(res.json).toHaveBeenCalledWith(new ApiResponse(500, null, 'Something went wrong'));
    });
});
