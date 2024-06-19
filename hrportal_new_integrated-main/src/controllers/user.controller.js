const ApiResponse = require("../utils/apiResponse");
const userService = require("../service/userService");

const registerUserController = async (req, res) => {
  try {
    await userService.registerUser(req.body);
    return res
      .status(201)
      .json(new ApiResponse(201, null, "User registered successfully."));
  } catch (error) {
    if (error.message.includes("Duplicate entry")) {
      return res.status(400).json(new ApiResponse(400, null, error.message));
    }
    return res.status(400).json(new ApiResponse(400, null, error.message));
  }
};

const loginUserController = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await userService.loginUser(email, password);
    return res
      .status(200)
      .json(
        new ApiResponse(
          200,
          { userDetail: user },
          "User logged in successfully"
        )
      );
  } catch (error) {
    return res.status(400).json(new ApiResponse(400, null, error.message));
  }
};

const sendVerificationMailController = async (req, res) => {
  try {
    const { email } = req.body;
    console.log(email);
    await userService.sendVerificationMail(email);
    return res
      .status(200)
      .json(new ApiResponse(200, null, "Verification email sent successfully"));
  } catch (error) {
    return res.status(500).json(new ApiResponse(500, null, error.message));
  }
};

const verifyEmailTokenController = async (req, res) => {
  try {
    const { email_token, email } = req.body;
    const user = await userService.verifyEmailToken(email_token, email);
    if (user) {
      return res
        .status(200)
        .json(
          new ApiResponse(
            200,
            { userDetails: user },
            "Email verification successful"
          )
        );
    } else {
      return res
        .status(400)
        .json(new ApiResponse(400, null, "Invalid or expired email token"));
    }
  } catch (error) {
    return res.status(500).json(new ApiResponse(500, null, error.message));
  }
};

const updateProfileController = async (req, res) => {
  try {
    const { id, fname, lname, mobile_no } = req.body;
    console.log(id, fname, lname, mobile_no);
    const updatedUser = await userService.updateProfile(
      id,
      fname,
      lname,
      mobile_no
    );
    res
      .status(200)
      .json(
        new ApiResponse(200, { updatedUser }, "Profile updated successfully")
      );
  } catch (error) {
    return res.status(500).json(new ApiResponse(500, null, error.message));
  }
};

const updatePasswordController = async (req, res) => {
  try {
    const { id, oldPassword, newPassword } = req.body;
    console.log(id, oldPassword, newPassword);
    await userService.updatePassword(id, oldPassword, newPassword);
    res
      .status(200)
      .json(new ApiResponse(200, null, "Password updated successfully"));
  } catch (error) {
    return res.status(500).json(new ApiResponse(500, null, error.message));
  }
};
const sendPasswordMailController = async (req, res) => {
  try {
    const { email } = req.body;
    console.log(email);
    await userService.sendpasswordUpdateMail(email);
    res
      .status(200)
      .json(
        new ApiResponse(200, null, "password update mail send successfully")
      );
  } catch (error) {
    return res.status(500).json(new ApiResponse(500, null, error.message));
  }
};

const resetPasswordController = async (req, res) => {
  try {
    const { email, newPassword } = req.body;
    console.log(email, newPassword);
    await userService.resetPassword(email, newPassword);
    res
      .status(200)
      .json(new ApiResponse(200, null, "Password updated successfully"));
  } catch (error) {
    return res.status(500).json(new ApiResponse(500, null, error.message));
  }
};
module.exports = {
  registerUserController,
  loginUserController,
  verifyEmailTokenController,
  updateProfileController,
  updatePasswordController,
  sendVerificationMailController,
  sendPasswordMailController,
  resetPasswordController,
};
