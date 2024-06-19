const audioService = require("../service/audioService.js");
const ApiResponse = require("../utils/apiResponse");

const uploadAudioController = async (req, res) => {
  const { empid } = req.body;
  const audio = req.file;
  try {
    if (!audio || !empid) {
      return res.status(400).send("No audiofile  or empid uploaded");
    }
    const audioData = await audioService.uploadAudio(audio, empid);
    res.json(
      new ApiResponse(201, { audio: audioData }, "audio uploaded successfully")
    );
  } catch (error) {
    console.error("Error uploading audio:", error.message);
    res.json(new ApiResponse(500, null, error.message));
  }
};

const getAudiosController = async (req, res) => {
  const { empid } = req.params;
  try {
    const recentAudios = await audioService.getRecentAudio(empid);
    res.json(
      new ApiResponse(200, recentAudios, "Recent Audios retrieved successfully")
    );
  } catch (error) {
    console.error("Error fetching recent Audios:", error);
    res.json(new ApiResponse(500, null, "Failed to retrieve recent Audios"));
  }
};
const deleteAudioController = async (req, res) => {
  const { _id } = req.params;
  //console.log(_id);
  try {
    await audioService.deleteAudio(_id);
    res.json(new ApiResponse(200, null, "Audio deleted successfully"));
  } catch (error) {
    console.error("Error deleting Audio:", error.message);
    res.json(new ApiResponse(500, null, error.message));
  }
};

module.exports = {
  uploadAudioController,
  getAudiosController,
  deleteAudioController,
};
