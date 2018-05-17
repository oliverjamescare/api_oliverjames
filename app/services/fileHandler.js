//core
const multer  = require('multer');
const Utils = require("../services/utils");
const fs = require('fs');

//settings
const uploadsPath = "public/uploads/";

module.exports = function(req, res)
{
	const clearUpload = function ()
	{
		//clears upload on unsuccessful
		if(req.file)
			fs.unlink(req.file.path, (error) => (error)? console.log(error) : removeEmptyDirectories(req.file.path));

        //clears multi upload on unsuccessful
		if(req.files)
		{
			req.files.forEach(file => {
                fs.unlink(file.path, (error) => (error)? console.log(error) : removeEmptyDirectories(file.path));
			});
		}
	}

	return {
		handleSingleUpload: function(field, path, settings = {})
		{
            let { upload, constrains } = getUploader(field, path, settings);
            upload = upload.single(field);

			//registers on response hook to clear upload from failed actions
			res.on("finish", () => {
				if(res.statusCode != 200 && res.statusCode != 201)
					clearUpload();
			});

			return new  Promise((resolve) => {
				upload(req, res, (error) => {

						if(error)
						{
							if(error.code == "LIMIT_FILE_SIZE")
								return res.status(406).json(Utils.parseStringError(`Uploaded file can\'t be bigger than ${constrains.maxFileSize}MB.`, error.field ));

							return res.status(406).json(Utils.parseStringError(error.message, error.field ));
						}

						//removing given file if this is replacement method
						if(req.file && constrains.fileToRemove)
							fs.unlink(uploadsPath + constrains.fileToRemove, (error) => (error)? console.log(error) : removeEmptyDirectories(uploadsPath + constrains.fileToRemove));

						resolve(req.file ? path + "/" + req.file.filename : undefined);
					}
				);
			});
		},

		getFileUrl: function (filePath)
		{
			const protocol = req.secure ? "https://" : "http://";
			return /^http/.test(filePath) ? filePath : protocol + req.headers.host + uploadsPath.substr(uploadsPath.indexOf("/")) + filePath;
		},

        getFileFromUrl: function(url = "")
        {
            const protocol = req.secure ? "https://" : "http://";
            const serverPath = protocol + req.headers.host + uploadsPath.substr(uploadsPath.indexOf("/"));

            return url.replace(serverPath, "");
        },

        deleteFile: function(filePath)
        {
            if(filePath)
                fs.unlink(uploadsPath + filePath, (error) => (error)? console.log(error) : removeEmptyDirectories(uploadsPath + filePath));
        },

        handleMultiFilesUpload: function(field, path, settings = {})
        {
        	let { upload, constrains } = getUploader(field, path, settings);
            upload = upload.array(field, constrains.maxFiles);

            //registers on response hook to clear upload from failed actions
            res.on("finish", () => {
                if(res.statusCode != 200 && res.statusCode != 201)
                    clearUpload();
            });

            return new  Promise((resolve) => {
                upload(req, res, (error) => {

                        if(error)
                        {
                            if(error.code == "LIMIT_FILE_SIZE")
                                return res.status(406).json(Utils.parseStringError(`Uploaded file can\'t be bigger than ${constrains.maxFileSize}MB.`, error.field ));

                            return res.status(406).json(Utils.parseStringError(error.message, error.field ));
                        }

						const paths = req.files ? req.files.map(file => path + "/" + file.filename) : undefined;
                        resolve(paths);
                    }
                );
            });
        }
	}
}

function getUploader(field, path, settings = {})
{
    const constrains = {
        maxFileSize: settings.maxFileSize || 5,
        allowedMimeTypes: settings.allowedMimeTypes || [],
        fileToRemove: settings.fileToRemove || false,
        skipCondition: settings.skipCondition || (() => false),
        maxFiles: settings.maxFiles || 5
    };

    const storage = multer.diskStorage({
        destination: "./" + uploadsPath + path + "/",
        filename: (req, file, cb) => cb(null, new Date().getTime() + file.originalname.replace(/\s/g, '-'))
    });

    const upload = multer({
        storage: storage,
        limits: {
            fileSize: 1024 * 1024 * constrains.maxFileSize
        },
        fileFilter: (req, file, cb) => {

            if(constrains.skipCondition())
                return cb(null, false);
            else
            {
                const valid = constrains.allowedMimeTypes.indexOf(file.mimetype) != -1;
                return valid ? cb(null, true) : cb({ message: "Invalid mime type. Allowed mime types: " + constrains.allowedMimeTypes.join(', ') + ".", field: field });
            }
        }
    })

	return { upload, constrains }
}
function removeEmptyDirectories(path)
{
	const currentFolderPath = path.substr(0, path.replace(/\\/g,"/").lastIndexOf("/"));
	console.log(currentFolderPath)
	fs.readdir(currentFolderPath, (error, files) => {
		if(!error && files && !files.length)
		{
			fs.rmdir(currentFolderPath, (error) => {
				if(!error)
					removeEmptyDirectories(currentFolderPath);
			});
		}
	});
}