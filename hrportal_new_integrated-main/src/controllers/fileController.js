const fileService = require("../service/fileService");
const ApiResponse = require("../utils/apiResponse");

// Controller to handle file upload
const uploadFileController = async (req, res) => {
  const { empid } = req.body;
  try {
    const file = req.file;

    console.log(file.originalname);
    if (!file) {
      return res.status(400).json({ message: "No file uploaded" });
    }
    const uploadResult = await fileService.uploadFile(file, empid);
    console.log(uploadResult);
    res
      .status(201)
      .json({ message: "File uploaded successfully", file: uploadResult });
  } catch (error) {
    console.error("Error uploading file:", error);
    res
      .status(500)
      .json({ message: "Failed to upload file", error: error.message });
  }
};

// Controller to handle file deletion
const deleteFileController = async (req, res) => {
  const { _id } = req.params;
  try {
    if (!_id) {
      return res.status(400).json({ message: "No file id provided" });
    }
    const deleteResult = await fileService.deleteFile(_id);
    res
      .status(200)
      .json({ message: "File deleted successfully", deleteResult });
  } catch (error) {
    console.error("Error deleting file:", error);
    res
      .status(500)
      .json({ message: "Failed to delete file", error: error.message });
  }
};

// Controller to retrieve files by empid
const getFilesController = async (req, res) => {
  const { empid } = req.params;

  if (!empid) {
    return res.status(400).json({ message: "empid parameter is required" });
  }

  try {
    const files = await fileService.getFiles(empid);
    res.status(200).json({ files });
  } catch (error) {
    console.error("Error retrieving files:", error);
    res
      .status(500)
      .json({ message: "Failed to retrieve files", error: error.message });
  }
};

module.exports = {
  uploadFileController,
  deleteFileController,
  getFilesController,
};
