const mongoose = require('mongoose');

const fileSchema = new mongoose.Schema({
  path: {
    type: String,
    required: true,
  },
  filename: {
    type: String,
    required: true
  },
  empid: {
    type: String,
    required: true,
  },
  cloudinary_id: {
    type: String,
    required: true
  },
  uploadedAt: {
    type: Date,
    default: Date.now,
  },
});

const File = mongoose.model('File', fileSchema);

module.exports = File;
