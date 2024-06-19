const videos = require("../models/video.models.js");
const cloudinary = require("../utils/cloudinary.js");

const uploadVideo = async (empid, video) => {
  const filename = video.originalname;
  if (!empid || typeof empid !== "string") {
    throw new Error("Invalid or missing employee ID");
  }
  if (!video || !video.path || !video.originalname) {
    throw new Error("Invalid image parameters");
  }
  try {
    // Upload video to Cloudinary
    const uploadVideoOnCloudinary = await cloudinary.uploader.upload(
      video.path,
      {
        folder: "videos",
        resource_type: "video",
      }
    );

    // Create a new entry in the database
    const newVideo = new videos({
      path: uploadVideoOnCloudinary.secure_url,
      filename: filename,
      empid: empid,
      cloudinary_id: uploadVideoOnCloudinary.public_id,
      uploadedAt: new Date(),
    });
    const savedVideo = await newVideo.save();
    if (!savedVideo || !savedVideo._id)
      throw new Error("Failed to save the video");

    const data = {
      empid: empid,
      video: {
        _id: savedVideo._id,
        filename: savedVideo.originalname,
        path: uploadVideoOnCloudinary.secure_url,
      },
    };
    return data;
  } catch (error) {
    console.log("Error uploading video to Cloudinary:", error.message);
    throw new Error("Failed to upload video");
  }
};

const getRecentVideo = async (empid, limit = 6) => {
  try {
    const recentVideos = await videos
      .find({ empid })
      .sort({ uploadedAt: -1 })
      .limit(limit);
    console.log(recentVideos);
    return recentVideos;
  } catch (error) {
    console.error(
      "Error retrieving recent videos from the database:",
      error.message
    );
    throw new Error("Failed to retrieve recent videos");
  }
};

const deleteVideo = async (_id) => {
  if (!_id) {
    throw new Error("Invalid parameter");
  }
  const video = await videos.findOne({ _id: _id });

  if (!video) {
    throw new Error("video not found");
  }

  const deleteVideoFromCloudinary = await cloudinary.uploader.destroy(
    video.cloudinary_id,
    { resource_type: "video" }
  );

  if (!deleteVideoFromCloudinary) {
    throw new Error("Failed to delete video from Cloudinary");
  }

  const deletedVideo = await videos.deleteOne({ _id: _id });
  if (!deletedVideo) {
    throw new Error("Failed to delete video from database");
  }
  console.log("video deleted successfully");
  return;
};

module.exports = {
  uploadVideo,
  getRecentVideo,
  deleteVideo,
};
