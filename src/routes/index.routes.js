import { Router } from 'express';
import { uploadMiddleware } from '../config/multer.js';
const router = Router();

router.get('/', (_req, res) => {
  try {
    res.render('index');
  } catch (error) {
    res.status(400).send('No existe un index para mostrar' + error.message);
  }
});

router.post('/upload', uploadMiddleware, (req, res) => {
  try {
    if (!req.file) {
      res.status(400).send('No file uploaded.');
      return;
    }
    res.send('Uploader');
  } catch (error) {
    res.status(400).send(error);
  }
});

export default router;
