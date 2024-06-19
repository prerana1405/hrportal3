const express = require("express");
const { uploadImage } = require("../middleware/multer.middleware.js");
const {
  uploadMultiImageController,
  deleteMultiImageController,
  getImagesController,
  getProfilePictureController,
} = require("../controllers/profilePicController.js");

const router = express.Router();

router.post("/upload", uploadImage.single("image"), uploadMultiImageController);
router.get("/recent-images/:empid", getImagesController);
router.get("/:empid", getProfilePictureController);
router.delete("/delete-image/:empid", deleteMultiImageController);

module.exports = router;
