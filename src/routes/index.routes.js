
import { Router } from 'express'
import { uploadMiddleware } from '../config/multer.js';
const router = Router()

router.get('/', (req, res) => {
    res.render('index');
})

router.post('/upload', uploadMiddleware, (req, res) => {
    try {
        if (!req.file) {
            res.status(400).send('No file uploaded.');
            return;
        }
        res.send('Uploader');
    } catch (error) {
        res.status(400).send(error)
    }
});

export default router