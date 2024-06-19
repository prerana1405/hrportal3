const jwt = require("jsonwebtoken");
const ApiResponse = require("../utils/apiResponse");
//const secretKey = "UJK@123";

const auth = (req, res, next) => {
  // Get token from the Authorization header
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res
      .status(403)
      .json(new ApiResponse(403, null, "Please login first"));
  }

  const token = authHeader.split(" ")[1];

  if (!token) {
    return res
      .status(403)
      .json(new ApiResponse(403, null, "Please login first"));
  }

  try {
    const decode = jwt.verify(token, process.env.JWT_SECRET);
    console.log(decode);
    // req.user = decode;
    next();
  } catch (error) {
    console.log(error);
    return res.status(401).json(new ApiResponse(401, null, "Invalid Token"));
  }
};

module.exports = auth;
