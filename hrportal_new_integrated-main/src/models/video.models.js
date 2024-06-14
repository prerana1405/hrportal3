import mongoose from 'mongoose';

const videoSchema = new mongoose.Schema({
    path: { type: String, required: true },
    filename: { type: String, required: true },
    empid: { type: String, required: true },
    uploadedAt: { type: Date, default: Date.now },
    cloudinary_id: { type: String, required: true }
});

const videos = mongoose.model('Video', videoSchema);
export default videos;
