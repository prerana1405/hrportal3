const mongoose = require('mongoose');

// Define the schema for the image model
const imageSchema = new mongoose.Schema({
  path: {
    type: String,
    required: true
  },
  filename: {
    type: String,
    required: true
  },
  empid: {
    type: String,
    required: true
  },
  profile_images_cloudinary_id: {
    type: String,
    required: true
  },
  history_images_cloudinary_id: {
    type: String,
    required: true
  },
  uploadedAt: {
    type: Date,
    default: Date.now
  },
});

const ProfilePic = mongoose.model('profilePic', imageSchema);

module.exports = ProfilePic;