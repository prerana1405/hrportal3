const express = require("express");
const { uploadFile } = require("../middleware/multer.middleware.js");
const {
  uploadFileController,
  deleteFileController,
  getFilesController,
} = require("../controllers/fileController.js");
const multer = require("multer");

const router = express.Router();

// Upload docs
router.post("/upload", uploadFile.single("file"), uploadFileController);
router.get("/get-files/:empid", getFilesController);
router.delete("/delete-file/:_id", deleteFileController);

module.exports = router;
