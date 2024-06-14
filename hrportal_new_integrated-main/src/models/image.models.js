import mongoose from 'mongoose';

const imagesSchema = new mongoose.Schema({
  path: {
    type: String,
    required: true,
  },
  filename : {
    type :String,
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

const images = mongoose.model('images', imagesSchema);

export default images;