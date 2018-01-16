const multer  = require('multer');

module.exports = function(req, res)
{
    return {
        singleUpload: function(source, path, allowedMimeTypes = [], maxFileSize = 5, filterFunction = (req)=> true)
        {
            return new  Promise((resolve, reject) => {
                const storage = multer.diskStorage({
                    destination: "./public/uploads/"+ path +"/",
                    filename: (req, file, cb) => cb(null, new Date().getTime() + file.originalname)
                });

                const upload = multer({
                    storage: storage,
                    limits: {
                        fileSize: 1024 * 1024 * maxFileSize
                    },
                    fileFilter: (req, file, cb) => cb(null, allowedMimeTypes.indexOf(file.mimetype) != -1 && filterFunction(req))
                }).single(source);

                upload(req, res,
                    (error) => {
                        if(error)
                            return res.status(406).json(error);

                        resolve();
                    }
                );
            });
        }
    }
}