const videoService = require("../service/videoService.js");
const ApiResponse = require("../utils/apiResponse");

const uploadVideoController = async (req, res) => {
  try {
    const { empid } = req.body;
    const video = req.file;
    console.log(video);
    const videoData = await videoService.uploadVideo(empid, video);
    res.json(new ApiResponse(201, videoData, "video uploaded successfully."));
  } catch (error) {
    console.error("Error uploading video:", error.message);
    res.json(new ApiResponse(400, null, error.message));
  }
};

const deleteVideoController = async (req, res) => {
  const { _id } = req.params;
  console.log(_id);
  try {
    await videoService.deleteVideo(_id);
    res.json(new ApiResponse(200, null, "Video deleted successfully"));
  } catch (error) {
    console.error("Error deleting video:", error.message);
    res.json(new ApiResponse(500, null, error.message));
  }
};

const getVideosController = async (req, res) => {
  const { empid } = req.params;
  try {
    const recentVideos = await videoService.getRecentVideo(empid);
    res.json(
      new ApiResponse(200, recentVideos, "Recent videos retrieved successfully")
    );
  } catch (error) {
    console.error("Error fetching recent videos:", error);
    res.json(new ApiResponse(500, null, "Failed to retrieve recent videos"));
  }
};
module.exports = {
  uploadVideoController,
  deleteVideoController,
  getVideosController,
};
