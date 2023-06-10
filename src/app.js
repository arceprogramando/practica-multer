import express from 'express'
import path from 'path'
import { __dirname } from './utils.js';
import appRouter from './routes/index.routes.js'


// Initializations
const app = express();

// Settings
app.set('port', 3000)
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')

//Routes

app.use('/', appRouter)

// Static Files
app.use(express.static(path.join(__dirname, 'public')))

app.listen(app.get('port'), () => {
    console.log(`Server on post: \n http://localhost:${app.get('port')}`)
})

