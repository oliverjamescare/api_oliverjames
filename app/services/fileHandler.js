const multer  = require('multer');
const Utils = require("../services/utils");

module.exports = function(req, res)
{
    return {
        singleUpload: function(source, path, allowedMimeTypes = [], maxFileSize = 5, filterFunction = (req) => true )
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
                        {
                            if(error.code == "LIMIT_FILE_SIZE")
                                return res.status(406).json(Utils.parseStringError("Uploaded file is too big", error.field ));

                            return res.status(406).json(error);
                        }

                        resolve();
                    }
                );
            });
        }
    }
}