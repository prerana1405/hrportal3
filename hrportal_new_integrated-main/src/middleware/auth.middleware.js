const jwt = require("jsonwebtoken");
const ApiResponse = require("../utils/apiResponse");
const ApiError = require("../utils/apiError");
const {
  generateAccessAndRefreshTokens,
} = require("../utils/generateJwtToken.js");
const { findUserById, findUserByEmpId } = require("../models/user.models.js");

const verifyJWT = async (req, res, next) => {
  try {
    const token = req.cookies?.accessToken || req.headers["x-access-token"];

    // req.header("Authorization")?.replace("Bearer ", "");

    if (!token) {
      throw new ApiError(401, "Unauthorized request");
    }

    const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);

    const user = await findUserById(decodedToken?.id);

    if (!user) {
      throw new ApiError(401, "Invalid Access Token");
    }

    // Ensure sensitive fields like password and refreshToken are not exposed here
    delete user.password;
    delete user.refreshToken;

    req.user = user;
    next();
  } catch (error) {
    next(new ApiError(401, error?.message || "Invalid access token"));
  }
};
const verifyAndRefreshToken = async (incomingRefreshToken) => {
  const decodedToken = jwt.verify(
    incomingRefreshToken,
    process.env.REFRESH_TOKEN_SECRET
  );
  console.log(decodedToken);
  const user = await findUserByEmpId(decodedToken.empid);
  console.log(user);

  if (!user) {
    throw new ApiError(401, "Invalid refresh token");
  }

  if (incomingRefreshToken !== user.refresh_token) {
    throw new ApiError(401, "Refresh token is expired or used");
  }

  const { accessToken, refreshToken } = await generateAccessAndRefreshTokens(
    user.id
  );

  return { accessToken, refreshToken };
};

module.exports = { verifyJWT, verifyAndRefreshToken };
