const express = require("express");
const { uploadVideo } = require("../middleware/multer.middleware.js");
const {
  uploadVideoController,
  deleteVideoController,
  getVideosController,
} = require("../controllers/videoController.js");

const router = express.Router();

router.post("/upload", uploadVideo.single("video"), uploadVideoController);
router.get("/recent-videos/:empid", getVideosController);
router.delete("/delete-video/:_id", deleteVideoController);
module.exports = router;
