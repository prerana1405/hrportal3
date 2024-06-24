const jwt = require("jsonwebtoken");
const {
  findUserById,
  updateUserRefreshToken,
} = require("../models/user.models.js");
const generateAccessToken = (user) => {
  return new Promise((resolve, reject) => {
    const payload = {
      id: user.id,
      email: user.email,
    };

    jwt.sign(
      payload,
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: process.env.ACCESS_TOKEN_EXPIRY },
      (err, token) => {
        if (err) {
          reject(err);
        } else {
          resolve(token);
        }
      }
    );
  });
};

const generateRefreshToken = (user) => {
  return new Promise((resolve, reject) => {
    const payload = {
      empid: user.empid,
    };

    jwt.sign(
      payload,
      process.env.REFRESH_TOKEN_SECRET,
      { expiresIn: process.env.REFRESH_TOKEN_EXPIRY },
      (err, token) => {
        if (err) {
          reject(err);
        } else {
          resolve(token);
        }
      }
    );
  });
};

const generateAccessAndRefreshTokens = async (userId) => {
  try {
    const user = await findUserById(userId);
    if (!user) {
      throw new Error("User not found");
    }

    const accessToken = await generateAccessToken(user);
    console.log(accessToken);
    const refreshToken = await generateRefreshToken(user);

    await updateUserRefreshToken(user.id, refreshToken);

    return { accessToken, refreshToken };
  } catch (error) {
    console.error("Error while generating tokens:", error);
    throw new Error(
      "Something went wrong while generating refresh and access token"
    );
  }
};

module.exports = { generateAccessAndRefreshTokens };
