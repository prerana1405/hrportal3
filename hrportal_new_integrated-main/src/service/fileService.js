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

export const deleteFileFromCloudinary=async(empid)=>{
   
    if (!empid) {
        throw new Error('Invalid parameter');
      }
    
      try {
        const file = await File.findOne({ empid: empid });
    
        if (!file) {
          throw new Error('file not found');
        }
    
        await cloudinary.uploader.destroy(file.cloudinary_id);
    
        await File.deleteOne({ empid: empid });
    
        return { message: 'file deleted successfully' };
      } catch (error) {
        console.error('Error deleting file from Cloudinary and database:', error);
        throw new Error('Failed to delete file');
      }
}

