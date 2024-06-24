const {
  findUser,
  signupUser,
  findUserByEmail,
  updateUserVerification,
  updateUserDetails,
  UpdateUserPassword,
  findUserById,
} = require("../models/user.models.js");
const { sendMail, sendPasswordMail } = require("../utils/sendEmail.js");
const validateUserData = require("../utils/user.validation.js");
const bcrypt = require("bcrypt");
const {
  generateAccessAndRefreshTokens,
} = require("../utils/generateJwtToken.js");
const registerUser = async (userData) => {
  const { fname, lname, email, empid, password, mobile_no } = userData;
  const validationResult = validateUserData({
    fname,
    lname,
    email,
    empid,
    password,
    mobile_no,
  });
  if (!validationResult.success) {
    throw new Error(validationResult.message);
  }
  const existingUser = await findUserByEmail(email);
  if (existingUser) {
    throw new Error("Email is already assigned");
  }
  const newUser = await signupUser(
    fname,
    lname,
    email,
    empid,
    password,
    mobile_no
  );
  return newUser;
};

const sendVerificationMail = async (email) => {
  try {
    const user = await findUserByEmail(email);
    if (!user) {
      throw new Error("User not found");
    }
    if (user.is_verified) {
      throw new Error("User is already verified");
    }
    await sendMail(user);
  } catch (error) {
    if (error.message === "User is already verified") {
      console.error("Error: User is already verified");
      throw new Error("User is already verified");
    }
    console.error("Error while sending verification email:", error);
    throw new Error("Failed to send verification email");
  }
};

const verifyEmailToken = async (email_token, email) => {
  try {
    const user = await findUserByEmail(email);
    if (user && user.email_token === email_token) {
      await updateUserVerification(user.id);
      const user2 = await findUserByEmail(email);
      const userToSend = {
        id: user2.id,
        fname: user2.fname,
        lname: user2.lname,
        email: user2.email,
        empid: user2.empid,
        mobile_no: user2.mobile_no,
        is_verified: user2.is_verified,
      };
      return userToSend;
    } else {
      return null;
    }
  } catch (error) {
    console.error("Error while verifying email token:", error);
    throw new Error("Failed to verify email token");
  }
};

const loginUser = async (email, password) => {
  if (!email || !password) {
    throw new Error("Email and password are required");
  }
  const user = await findUser(email, password);
  if (!user) {
    throw new Error("User not found or invalid credentials");
  }
  const { accessToken, refreshToken } = await generateAccessAndRefreshTokens(
    user.id
  );
  const userToSend = {
    id: user.id,
    fname: user.fname,
    lname: user.lname,
    email: user.email,
    empid: user.empid,
    mobile_no: user.mobile_no,
    is_verified: user.is_verified,
    refresh_token: refreshToken,
  };

  return { accessToken, refreshToken, user: userToSend };
};

const updateProfile = async (id, fname, lname, mobile_no) => {
  if (!id || !fname || !lname || !mobile_no) {
    throw new Error("All fields are required");
  }
  const updatedUser = await updateUserDetails(id, fname, lname, mobile_no);
  if (!updatedUser) {
    throw new Error("User not updated or invalid credentials");
  }

  const user = await findUserById(id);

  const userToSend = {
    id: user.id,
    fname: user.fname,
    lname: user.lname,
    email: user.email,
    empid: user.empid,
    mobile_no: user.mobile_no,
  };

  return userToSend;
};

const updatePassword = async (id, oldPassword, newPassword) => {
  if (!id || !oldPassword || !newPassword) {
    throw new Error("All fields are required");
  }

  const user = await findUserById(id);

  const isMatch = await bcrypt.compare(oldPassword, user.password);

  if (!isMatch) {
    throw new Error("Old password does not match");
  }

  const updateResult = await UpdateUserPassword(id, newPassword);

  return updateResult;
};
const sendpasswordUpdateMail = async (email) => {
  try {
    const user = await findUserByEmail(email);
    if (!user) {
      throw new Error("User not found");
    }

    await sendPasswordMail(user);
  } catch (error) {
    console.error("Error while sending  email:", error);
    throw new Error("Failed to send  email");
  }
};

const resetPassword = async (email, newPassword) => {
  if (!email || !newPassword) {
    throw new Error("All fields are required");
  }

  const user = await findUserByEmail(email);

  const updateResult = await ResetUserPassword(email, newPassword);

  return updateResult;
};
module.exports = {
  registerUser,
  loginUser,
  verifyEmailToken,
  updateProfile,
  updatePassword,
  sendVerificationMail,
  sendpasswordUpdateMail,
  resetPassword,
};
