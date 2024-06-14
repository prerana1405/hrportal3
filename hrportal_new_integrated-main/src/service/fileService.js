import cloudinary from '../utils/cloudinary.js';
import File from '../models/file.models.js';

export const uploadFileToCloudinary = async (file, empid) => {
    const filename =  file.originalname;
    console.log(filename);
  if (!file || !empid) {
    throw new Error('Invalid parameters');
  }
  try {
    const uploadResult = await cloudinary.uploader.upload(file.path, {
        folder: 'users_files',
        resource_type:"auto"
    });   
    const newFile = new File({
        path: uploadResult.secure_url,
        filename : filename,
        empid: empid,
        cloudinary_id: uploadResult.public_id,
        uploadedAt: new Date(),
      });
    await newFile.save();
    return newFile;

  } catch (error) {
    console.error('Error uploading file to Cloudinary:', error);
    throw new Error('Failed to upload file');
  }
};

export const deleteFileFromCloudinary=async(_id)=>{
   
    if (!_id) {
        throw new Error('Invalid parameter');
      }
    
      try {
        const file = await File.findOne({ _id :_id });
    
        if (!file) {
          throw new Error('file not found');
        }
    
        await cloudinary.uploader.destroy(file.cloudinary_id);
    
        await File.deleteOne({ _id: _id });
    
        return { message: 'file deleted successfully' };
      } catch (error) {
        console.error('Error deleting file from Cloudinary and database:', error);
        throw new Error('Failed to delete file');
      }
}

export const retrieveFiles=async(empid)=>{
  if (!empid) {
    throw new Error('Invalid parameters: empid is required');
}
try {
    const files = await File.find({ empid: empid });
    if (!files || files.length === 0) {
        throw new Error('No files found for the given empid');
    }
    return files;
} catch (error) {
    console.error('Error retrieving files:', error.message);
    throw new Error('Failed to retrieve files');
}  
}