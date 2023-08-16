import express from 'express'
import { apiRouter } from '../routers/api.router.js'
import session from '../middlewares/session.js'
import { passportInitialize, passportSession } from '../middlewares/passport.js'
import { engine } from 'express-handlebars'
import { logger } from '../middlewares/logger.js'

export const app = express()

app.engine('handlebars', engine())
app.set('views', './views')
app.set('view engine', 'handlebars')

// Configuración de CORS
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*'); // Permite cualquier origen (no se recomienda en producción)
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE'); // Métodos HTTP permitidos
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept'); // Cabeceras permitidas
  next();
});


app.use(express.static('./public'))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use(logger)

app.use(session)

app.use(passportInitialize, passportSession)

app.use('/api', apiRouter)
