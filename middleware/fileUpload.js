const multer = require("multer");
const path = require("path");

// Configure storage for uploaded files
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        // Set the destination folder where files will be stored
        cb(null, "uploads/"); // 'uploads' folder in the root of your project
    },
    filename: (req, file, cb) => {
        // Set a unique filename for each uploaded file
        const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1E9)}`;
        cb(null, `${file.fieldname}-${uniqueSuffix}${path.extname(file.originalname)}`);
    },
});

// File filter: You can skip the filter if you want to accept any type of file
const fileFilter = (req, file, cb) => {
    // Here we can skip the file filter to allow all file types
    cb(null, true); // Allow all file types
};

// Set limits for the upload (optional, for example: max file size 10MB)
const upload = multer({
    storage,
    fileFilter,
    limits: { fileSize: 10 * 1024 * 1024 }, // Set limit for file size (10MB in this case)
});

// The `.any()` method handles multiple file uploads, no file type restrictions
const fileUpload = upload.any();

module.exports = fileUpload;
