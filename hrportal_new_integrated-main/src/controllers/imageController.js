import {uploadImageOnCloudinary,deleteImageOnCloudinary} from '../service/imageService.js';

export const uploadImage=async(req,res)=>{
    const {empid}=req.body;
    try{
        const image=req.file;
        if(!image){
            return res.status(400).json({message:'No image uploaded'});
        }
        if(!empid){
            return res.status(400).json({message:'No empid uploaded'});
        }
        const uploadResult = await uploadImageOnCloudinary(image,empid);
        res.status(201).json({message: 'Image uploaded successfully', image: uploadResult})
    }catch(error){
        console.error('Error uploading file:', error);
        res.status(500).json({ message: 'Failed to upload image', error });
    }
}

export const deleteImage=async(req,res)=>{
    const {empid}=req.query;
    try{
        if(!empid){
            return res.status(400).json({message:'No empid found'});
        }
        const uploadResult = await deleteImageOnCloudinary(empid);
        res.status(201).json({message: uploadResult})
    }catch(error){
        console.error('Error uploading file:', error);
        res.status(500).json({ message: 'Failed to delete  image', error });
    }
}
