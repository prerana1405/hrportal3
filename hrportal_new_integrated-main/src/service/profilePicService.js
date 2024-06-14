import profilePic from  '../models/profilePic.models.js';
import cloudinary from '../utils/cloudinary.js';



export const uploadImageOnCloudinary =async(image,empid)=>{
    const imagename=image.originalname;
    if(!image || !empid){
        throw new Error('Invalid parameters');
    }
    try{
        const uploadResult = await cloudinary.uploader.upload(image.path,{
            folder: 'profile_images',
            resource_type:"auto"
        })
        const uploadHistory = await cloudinary.uploader.upload(image.path,{
          folder: 'history_images',
          resource_type:"auto"  
      })
        const newImage = await profilePic.create({
            path: uploadResult.secure_url,
            filename : imagename ,
            empid: empid,
            uploadedAt: new Date(),
            profile_images_cloudinary_id: uploadResult.public_id,
            history_images_cloudinary_id: uploadHistory.public_id

        })
        await newImage.save();

        return newImage;

    }catch(error){
          console.log('Error uploading image Cloudenery:',error.message);
          throw new Error('Failed to upload image');
    }
}

export const deleteImageOnCloudinary = async (empid) => {
  if (!empid) {
    throw new Error('Invalid parameter');
  }
  try {
    const images = await profilePic.find({ empid: empid, profile_images_cloudinary_id: { $ne: null } });
    console.log(images);
    if (!images || images.length === 0) {
      throw new Error('No images found');
    }
    // Delete each image from Cloudinary and update MongoDB
    for (const image of images) {
      const deletedImage = await cloudinary.uploader.destroy(image.profile_images_cloudinary_id);

      if (!deletedImage) {
        throw new Error('Failed to delete image from Cloudinary');
      }

      await profilePic.updateOne({ empid: empid }, { $set: { profile_images_cloudinary_id: null} });
    }

    return { message: 'All profile images deleted successfully' };
  } catch (error) {
    console.error('Error deleting images from Cloudinary and updating database:', error.message);
    throw new Error('Failed to delete images');
  }
};

export const getImages = async (empid) => {
  try {
    const recentImages = await profilePic.find({ empid }); 
    if (!recentImages) {
      throw new Error('No profile image found');
    }
    console.log(recentImages);
    return recentImages;
  } catch (error) {
    console.error('Error retrieving recent images from the database:', error.message);
    throw new Error('Failed to retrieve recent images');
  }
};


export const getRecentProfileImage = async (empid) => {
  if (!empid || empid ==='null') {
    throw new Error('Invalid parameter');
  }

  try {
    const image = await profilePic.findOne({ empid: empid, profile_images_cloudinary_id: { $ne: null } })
                                   .sort({ uploadedAt: -1 });
     console.log(image);
    if (!image) {
      throw new Error('No profile image found');
    }

    return image;
  } catch (error) {
    console.error('Error retrieving profile image:', error.message);
    throw new Error('Failed to retrieve profile image');
  }
};
