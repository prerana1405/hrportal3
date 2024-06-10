import Multimages from  '../models/multimage.models.js';
import cloudinary from '../utils/cloudinary.js';

export const uploadImageOnCloudinary =async(image,empid)=>{
    const imagename=image.originalname;
    if(!image || !empid){
        throw new Error('Invalid parameters');
    }
    try{
        const uploadResult = await cloudinary.uploader.upload(image.path,{
            folder: 'multi_images',
            resource_type:"auto"
        })
        const newImage = await Multimages.create({
            path: uploadResult.secure_url,
            filename : imagename ,
            empid: empid,
            uploadedAt: new Date(),
            cloudinary_id: uploadResult.public_id
        })
        await newImage.save();

        return newImage;

    }catch(error){
          console.log('Error uploading image Cloudenery:',error);
          throw new Error('Failed to upload image');
    }
}
// uploadImageOnCloudinary;


export const deleteImageOnCloudinary=async(empid)=>{
   
    if (!empid) {
        throw new Error('Invalid parameter');
      }
    
      try {
        const image = await Multimages.findOne({ empid: empid });
    
        if (!image) {
          throw new Error('Image not found');
        }
    
        await cloudinary.uploader.destroy(image.cloudinary_id);
    
        await Multimages.deleteOne({ empid: empid });
    
        return { message: 'Image deleted successfully' };
      } catch (error) {
        console.error('Error deleting image from Cloudinary and database:', error);
        throw new Error('Failed to delete image');
      }
}

export const getRecentImages = async (empid,limit = 6) => {
  try {
    const recentImages = await Multimages.find({ empid })
      .sort({ uploadedAt: -1 }) // Sort by upload date in descending order
      .limit(limit); // Limit to the specified number of recent images

    return recentImages;
  } catch (error) {
    console.error('Error retrieving recent images from the database:', error);
    throw new Error('Failed to retrieve recent images');
  }
};