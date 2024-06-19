const express = require("express");
const { uploadAudio } = require("../middleware/multer.middleware.js");
const {
  uploadAudioController,
  getAudiosController,
  deleteAudioController,
} = require("../controllers/audioController.js");

const router = express.Router();

router.post("/upload", uploadAudio.single("audio"), uploadAudioController);
router.delete("/delete-audio/:_id", deleteAudioController);
router.get("/recent-audios/:empid", getAudiosController);

module.exports = router;
