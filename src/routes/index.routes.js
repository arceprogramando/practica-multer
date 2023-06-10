
import { Router } from 'express'
import multer from 'multer'
import { __dirname } from '../utils.js';
import path from 'path';
import { fileLoader } from 'ejs';
import { v4 as uuidv4 } from 'uuid'

const router = Router()

// Multer settings
const storage = multer.diskStorage({
    destination: path.join(__dirname, 'public/upload'),
    filename: (req, file, cb) => {
        cb(null, uuidv4() + path.extname(file.originalname).toLowerCase());
    }
});

// middlewares
const uploadMiddleware = multer({
    storage,
    limits: { fileSize: 1000000 },
    fileFilter: (req, file, cb) => {
        const filetypes = /jpeg|jpg|png|gif/;
        const mimetype = filetypes.test(file.mimetype);
        const extname = filetypes.test(path.extname(file.originalname));
        if (mimetype && extname) {
            return cb(null, true)
        }
        cb("Error el archivo no es una imagen")
    }
}).single('image');


router.get('/', (req, res) => {
    res.render('index');
})

router.post('/upload', uploadMiddleware, (req, res) => {
    if (!req.file) {
        res.status(400).send('No file uploaded.');
        return;
    }


    console.log(req.file.fileSize);
    res.send('Uploader');
});

export default router