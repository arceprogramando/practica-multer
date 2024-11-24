import multer from 'multer';
import { __dirname } from '../utils.js';
import path from 'path';
import { v4 as uuidv4 } from 'uuid';

// Multer settings
const storage = multer.diskStorage({
  destination: path.join(__dirname, 'public/upload'),
  filename: (_req, file, cb) => {
    cb(null, uuidv4() + path.extname(file.originalname).toLowerCase());
  },
});

// middlewares
export const uploadMiddleware = multer({
  storage,
  limits: { fileSize: 3000000 },
  fileFilter: (_req, file, cb) => {
    const filetypes = /jpeg|jpg|png|gif|webp|PNG|JPEG|JPG/;
    const mimetype = filetypes.test(file.mimetype);
    const extname = filetypes.test(path.extname(file.originalname));
    if (mimetype && extname) {
      return cb(null, true);
    }
    cb('Error el archivo no es una imagen compatible');
  },
}).single('image');
