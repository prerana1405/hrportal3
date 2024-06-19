const audios = require("../models/audio.models.js");
const cloudinary = require("../utils/cloudinary.js");

const uploadAudio = async (audio, empid) => {
  const filename = audio.originalname;
  if (!empid || typeof empid !== "string") {
    throw new Error("Invalid or missing employee ID");
  }
  if (!audio || !audio.path || !audio.originalname) {
    throw new Error("Invalid audio parameters");
  }
  try {
    // Upload audio to Cloudinary
    const uploadAudioOnCloudinary = await cloudinary.uploader.upload(
      audio.path,
      {
        folder: "audios",
        resource_type: "video",
      }
    );

    // Create a new entry in the database
    const newAudio = new audios({
      path: uploadAudioOnCloudinary.secure_url,
      filename: filename,
      empid: empid,
      uploadedAt: new Date(),
      cloudinary_id: uploadAudioOnCloudinary.public_id,
    });
    const savedAudio = await newAudio.save();
    if (!savedAudio || !savedAudio._id)
      throw new Error("Failed to save the audio");

    const data = {
      empid: empid,
      video: {
        _id: savedAudio._id,
        filename: savedAudio.originalname,
        path: uploadAudioOnCloudinary.secure_url,
      },
    };
    return data;
  } catch (error) {
    console.log("Error uploading audio to Cloudinary:", error.message);
    throw new Error("Failed to upload audio");
  }
};

const getRecentAudio = async (empid, limit = 6) => {
  try {
    const recentAudios = await audios
      .find({ empid })
      .sort({ uploadedAt: -1 })
      .limit(limit);
    console.log(recentAudios);
    return recentAudios;
  } catch (error) {
    console.error(
      "Error retrieving recent audios from the database:",
      error.message
    );
    throw new Error("Failed to retrieve recent audios");
  }
};

const deleteAudio = async (_id) => {
  if (!_id) {
    throw new Error("Invalid parameter");
  }
  const audio = await audios.findOne({ _id: _id });
  if (!audio) {
    throw new Error("Audio not found");
  }

  const deleteAudioFromCloudinary = await cloudinary.uploader.destroy(
    audio.cloudinary_id,
    { resource_type: "video" }
  );
  if (!deleteAudioFromCloudinary) {
    throw new Error("Failed to delete audio from Cloudinary");
  }

  const deletedAudio = await audios.deleteOne({ _id: _id });
  if (!deletedAudio) {
    throw new Error("Failed to delete audio from database");
  }
  console.log("Audio deleted successfully");
  return;
};

module.exports = { uploadAudio, getRecentAudio, deleteAudio };
