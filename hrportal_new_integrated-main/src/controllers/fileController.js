import { uploadFileToCloudinary,deleteFileFromCloudinary} from '../service/fileService.js';
export const uploadFile = async (req, res) => {
  const { empid } = req.body;
  try {
    const file = req.file;
    console.log(file.originalname);
    if (!file) {
      return res.status(400).json({ message: 'No file uploaded' });
    }
    const uploadResult = await uploadFileToCloudinary(file, empid);
    console.log(uploadResult);
    res.status(201).json({ message: 'File uploaded successfully', file: uploadResult });
  } catch (error) {
    console.error('Error uploading file:', error);
    res.status(500).json({ message: 'Failed to upload file', error });
  }
};
export const deleteFile=async(req,res)=>{
    const {empid}=req.query;
    try{
        if(!empid){
            return res.status(400).json({message:'No empid found'});
        }
        const uploadResult = await deleteFileFromCloudinary(empid);
        res.status(201).json({message: uploadResult})
    }catch(error){
        console.error('Error uploading file:', error);
        res.status(500).json({ message: 'Failed to delete file', error });
    }
}
