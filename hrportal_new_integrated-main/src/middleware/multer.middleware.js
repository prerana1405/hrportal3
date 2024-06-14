import multer from "multer";
const storage = multer.diskStorage({
    filename:function(req,file,cb){
        cb(null,file.originalname);
    }
})
export  const upload= multer({storage:storage})

export const uploadVideo = multer({
    storage: storage,
    limits: { fileSize: 100 * 1024 * 1024 }, // 100MB limit
    fileFilter: function (req, file, cb) {
        if (file.mimetype.startsWith('video/')) {
            cb(null, true);
        } else {
            cb(new Error('Invalid file type, only videos are allowed!'), false);
        }
    }
})

export const uploadAudio = multer({
    storage: storage,
    limits: { fileSize: 100 * 1024 * 1024 }, // 50MB limit
    fileFilter: function (req, file, cb) {
        if (file.mimetype.startsWith('audio/')) {
            cb(null, true);
        } else {
            cb(new Error('Invalid file type, only audio files are allowed!'), false);
        }
    }
});
//export {upload,uploadVideo} ;
