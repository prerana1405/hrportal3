
import { ApiResponse } from '../utils/apiResponse.js';
import { loginUser,
         registerUser,
         verifyEmailToken,
         updateProfile,
         updatePassword,
         sendVerificationMail
          } from '../service/userService.js';
import { ApiError } from '../utils/apiError.js';


const registerUserController = async (req, res) => {
    try {  
         await registerUser(req.body);
        return res.status(201).json(new ApiResponse(201, null, "User registered successfully."));
    } catch (error) {
        if (error.message.includes('Duplicate entry')) {
            return res.status(400).json(new ApiResponse(400, null, error.message));
        }
        return res.status(400).json(new ApiResponse(400, null, error.message));
    }
};


const loginUserController = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await loginUser(email, password);
        return res.status(200).json(new ApiResponse(200, { userDetail: user }, "User logged in successfully"));
    } catch (error) {
        console.log(error.message);
        return res.status(400).json(new ApiResponse(400, null, error.message));
    }
};

const sendVerificationMailController = async (req, res) => {
    try {
        const { email } = req.body;
        console.log(email);
        await sendVerificationMail(email);
        return res.status(200).json(new ApiResponse(200, null, "Verification email sent successfully"));
    } catch (error) {
        console.error("Error while sending verification email:", error.message);
        return res.status(500).json(new ApiResponse(500, null, error.message));
    }

};

const verifyEmailTokenController = async (req, res) => {
    try {
        const { email_token, email } = req.body;
        const user = await verifyEmailToken(email_token, email);
        if (user) {
            return res.status(200).json(new ApiResponse(200, { userDetails: user }, "Email verification successful"));
        } else {
            return res.status(400).json(new ApiResponse(400, null, "Invalid or expired email token"));
        }
    } catch (error) {
       
        console.error("Error while verifying email token:", error.message);
        return res.status(500).json(new ApiResponse(500, null, error.message));
    }
};


const updateProfileController = async (req, res) => {
    try {
        const { id, fname, lname, mobile_no } = req.body;
        console.log(id, fname, lname, mobile_no);
        const updatedUser = await updateProfile(id, fname, lname, mobile_no );
        res.status(200).json(new ApiResponse(200, {  updatedUser },"Profile updated successfully"));
    } catch (error) {
        console.error("Error while verifying email token:", error.message);
        return res.status(500).json(new ApiResponse(500, null, error.message));
    }
};


const updatePasswordController = async (req, res) => {
    try {
        const {id ,oldPassword ,newPassword } = req.body;
        console.log(id ,oldPassword ,newPassword);
        await updatePassword(id ,oldPassword ,newPassword);
        res.status(200).json(new ApiResponse(200, null ,"Password updated successfully"));
       
    } catch (error) {
        console.error("Error while password Varification:", error.message);
        return res.status(500).json(new ApiResponse(500, null, error.message));
    }     
};


export {
registerUserController,
loginUserController,
verifyEmailTokenController,
 updateProfileController,
 updatePasswordController,
 sendVerificationMailController
}