const jwt = require("jsonwebtoken");
// // const secretKey = "UJK@123"; // replace with your actual secret key

// const generateJwtToken = (pa) => {
//   const token = jwt.sign(user, process.env.JWT_SECRET, { expiresIn: "1h" }); // token expires in 1 hour
//   return token;
// };

// module.exports = generateJwtToken;
const generateJwtToken = (payload) => {
  return new Promise((resolve, reject) => {
    jwt.sign(
      payload,
      process.env.JWT_SECRET,
      { expiresIn: "1h" }, // Token expiration time
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
module.exports = generateJwtToken;
