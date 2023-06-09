import express from 'express'
import path from 'path'
import { __dirname } from './utils.js';
import multer from 'multer';
import ejs from 'ejs'

// Initializations
const app = express();

// Settings
app.set('port', 3000)
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')

// middlewares
app.use(multer({
    dest: path.join(__dirname, 'public/upload')
}).single('image'))

//Routes
app.get('/', (req, res) => {
    res.render('index');
})

app.post('/upload', (req, res) => {
    if (!req.file) {
        res.status(400).send('No file uploaded.');
        return;
    }

    console.log(req.file);
    res.send('Uploader');
});

app.listen(app.get('port'), () => {
    console.log(`Server on post: \n http://localhost:${app.get('port')}`)
})

