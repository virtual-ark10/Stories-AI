import { CloudinaryStorage } from "multer-storage-cloudinary";
import { v2 as cloudinary } from "cloudinary"
import dotenv from "dotenv"

dotenv.config();

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_KEY,
    api_secret: process.env.CLOUDINARY_SECRET
})

const allowedTypes = ['image/jpeg', 'image/png', 'image/webp', 'image/gif'];


const storage = new CloudinaryStorage({
    cloudinary,
    params: {
        folder: "Stories",
        allowedFormats: ['jpeg', 'png', 'jpg'],
        public_id: (req, file) => `${Date.now()}-${file.originalname}`
    }
})

const fileFilter = (req, file, cb) => {
    if(allowedTypes.includes(file.mimetype)) {
        cb(null, true);
    } else {
        cb(new Error('Unsupported file type'), false);
    }
}

export {storage, fileFilter};