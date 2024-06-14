import { uploadFileToCloudinary,deleteFileFromCloudinary,retrieveFiles} from '../service/fileService.js';


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
  console.log(req.params);
    const {_id}=req.params;
    try{
        if(!_id){
            return res.status(400).json({message:'No empid found'});
        }
        const uploadResult = await deleteFileFromCloudinary(_id);
        res.status(201).json({message: uploadResult})
    }catch(error){
        console.error('Error uploading file:', error);
        res.status(500).json({ message: 'Failed to delete file', error });
    }
}

export const getFiles = async (req, res) => {
  const { empid } = req.params;

  if (!empid) {
      return res.status(400).json({ message: 'empid parameter is required' });
  }

  try {
      const files = await retrieveFiles(empid);
      res.status(200).json({ files });
  } catch (error) {
      res.status(500).json({ message: error.message });
  }
};