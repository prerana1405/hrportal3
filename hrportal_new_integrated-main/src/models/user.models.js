const mysql = require("mysql2");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const dotenv = require("dotenv");

dotenv.config();

const connection = mysql.createConnection({
  host: process.env.HOST,
  user: process.env.USER,
  password: process.env.PASSWORD,
  database: process.env.DATABASE,
});

const findUser = (email, password) => {
  return new Promise((resolve, reject) => {
    const query = "SELECT * FROM users WHERE email = ?";
    connection.query(query, [email], (error, result) => {
      if (error) {
        console.error("Error while executing query:", error);
        reject(error);
        return;
      }
      if (result.length > 0) {
        const user = result[0];
        bcrypt.compare(password, user.password, (err, passwordMatch) => {
          if (err) {
            console.error("Error while comparing passwords:", err);
            reject(err);
            return;
          }
          if (passwordMatch) {
            console.log("User found:", user);
            resolve(user);
          } else {
            console.log("Incorrect password");
            resolve(null);
          }
        });
      } else {
        console.log("User not found");
        resolve(null);
      }
    });
  });
};

const signupUser = (fname, lname, email, empid, password, mobile_no) => {
  return new Promise((resolve, reject) => {
    const email_token = crypto.randomBytes(54).toString("hex");

    bcrypt.hash(password, 10, (error, hashedPassword) => {
      if (error) {
        console.error("Error while hashing password:", error);
        reject(error);
        return;
      }
      const query =
        "INSERT INTO users (fname, lname, email, empid, password, mobile_no, email_token) VALUES (?, ?, ?, ?, ?, ?, ?)";
      connection.query(
        query,
        [fname, lname, email, empid, hashedPassword, mobile_no, email_token],
        (error, result) => {
          if (error) {
            if (error.code === "ER_DUP_ENTRY") {
              console.error("Duplicate entry error:", error.message);
              reject(
                new Error(
                  "Duplicate entry: a user with the provided email, empid, or mobile_no already exists."
                )
              );
            } else {
              console.error("Error while executing query:", error);
              reject(error);
            }
            return;
          }
          console.log("User registered successfully");
          resolve(result);
        }
      );
    });
  });
};

const findUserByEmail = (email) => {
  return new Promise((resolve, reject) => {
    const query = "SELECT * FROM users WHERE email = ?";
    connection.query(query, [email], (error, result) => {
      if (error) {
        console.error("Error while executing query:", error);
        reject(error);
        return;
      }
      if (result.length > 0) {
        console.log("User found:", result[0]);
        resolve(result[0]);
      } else {
        console.log("User not found");
        resolve(null);
      }
    });
  });
};

const findUserById = (id) => {
  return new Promise((resolve, reject) => {
    const query = "SELECT * FROM users WHERE id = ?";
    connection.query(query, [id], (error, result) => {
      if (error) {
        console.error("Error while executing query:", error);
        reject(error);
        return;
      }
      if (result.length > 0) {
        console.log("User found:", result[0]);
        resolve(result[0]);
      } else {
        console.log("User not found");
        resolve(null);
      }
    });
  });
};

const updateUserVerification = (id) => {
  return new Promise((resolve, reject) => {
    const query =
      "UPDATE users SET email_token = NULL, is_verified = true WHERE id = ?";
    connection.query(query, [id], (error, result) => {
      if (error) {
        console.error("Error while executing update query:", error);
        reject(error);
        return;
      }
      console.log("User verification updated successfully");
      resolve(result);
    });
  });
};

const updateUserDetails = (id, fname, lname, mobile_no) => {
  return new Promise((resolve, reject) => {
    const query =
      "UPDATE users SET fname = ?, lname = ?, mobile_no = ? WHERE id = ?";
    connection.query(query, [fname, lname, mobile_no, id], (error, result) => {
      if (error) {
        console.error("Error while executing update query:", error);
        reject(error);
        return;
      }
      console.log("User details updated successfully");
      resolve(result);
    });
  });
};

const UpdateUserPassword = (id, newPassword) => {
  return new Promise((resolve, reject) => {
    bcrypt.hash(newPassword, 10, (error, hashedPassword) => {
      if (error) {
        console.error("Error while hashing password:", error);
        reject(error);
        return;
      }

      const query = "UPDATE users SET password = ? WHERE id = ?";
      connection.query(query, [hashedPassword, id], (error, result) => {
        if (error) {
          console.error("Error while executing password update query:", error);
          reject(error);
          return;
        }
        console.log("User password updated successfully");
        resolve(result);
      });
    });
  });
};
const ResetUserPassword = (email, newPassword) => {
  return new Promise((resolve, reject) => {
    bcrypt.hash(newPassword, 10, (error, hashedPassword) => {
      if (error) {
        console.error("Error while hashing password:", error);
        reject(error);
        return;
      }

      const query = "UPDATE users SET password = ? WHERE email = ?";
      connection.query(query, [hashedPassword, email], (error, result) => {
        if (error) {
          console.error("Error while executing password update query:", error);
          reject(error);
          return;
        }
        console.log("User password updated successfully");
        resolve(result);
      });
    });
  });
};

// Function to update user's refresh token
const updateUserRefreshToken = (userId, refreshToken) => {
  return new Promise((resolve, reject) => {
    const query = "UPDATE users SET refresh_token = ? WHERE id = ?";
    connection.query(query, [refreshToken, userId], (error, results) => {
      if (error) {
        console.error("Error while executing query:", error);
        reject(error);
        return;
      }
      resolve(results);
    });
  });
};

const findUserByEmpId = (empid) => {
  return new Promise((resolve, reject) => {
    const query = "SELECT * FROM users WHERE empid = ?";
    connection.query(query, [empid], (error, result) => {
      if (error) {
        console.error("Error while executing query:", error);
        reject(error);
        return;
      }
      if (result.length > 0) {
        console.log("User found:", result[0]);
        resolve(result[0]);
      } else {
        console.log("User not found");
        resolve(null);
      }
    });
  });
};

module.exports = { findUserByEmpId };

module.exports = {
  findUser,
  signupUser,
  findUserByEmail,
  findUserById,
  findUserByEmpId,
  updateUserVerification,
  updateUserDetails,
  UpdateUserPassword,
  ResetUserPassword,
  updateUserRefreshToken,
};
