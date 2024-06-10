import Image from  '../models/image.models.js';
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
        const newImage = await Image.create({
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


export const deleteImageOnCloudinary=async(empid)=>{
   
    if (!empid) {
        throw new Error('Invalid parameter');
      }
    
      try {
        const image = await Image.findOne({ empid: empid });
    
        if (!image) {
          throw new Error('Image not found');
        }
    
        await cloudinary.uploader.destroy(image.cloudinary_id);
    
        await Image.deleteOne({ empid: empid });
    
        return { message: 'Image deleted successfully' };
      } catch (error) {
        console.error('Error deleting image from Cloudinary and database:', error);
        throw new Error('Failed to delete image');
      }
}

