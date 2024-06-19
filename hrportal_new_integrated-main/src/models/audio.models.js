const mongoose = require("mongoose");

const audioSchema = new mongoose.Schema({
  path: { type: String, required: true },
  filename: { type: String, required: true },
  empid: { type: String, required: true },
  uploadedAt: { type: Date, default: Date.now },
  cloudinary_id: { type: String, required: true },
});

const audios = mongoose.model("Audio", audioSchema);

module.exports = audios;
