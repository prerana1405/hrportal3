const express = require("express");
const { uploadImage } = require("../middleware/multer.middleware.js");
const {
  uploadImageController,
  deleteImageController,
  getRecentImageController,
} = require("../controllers/imageController.js");

const router = express.Router();

router.post("/upload", uploadImage.single("image"), uploadImageController);
router.delete("/delete-image/:_id", deleteImageController);
router.get("/recent-images/:empid", getRecentImageController);

module.exports = router;
