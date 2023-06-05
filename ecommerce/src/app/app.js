import express from 'express'
import { apiRouter } from '../routers/api.router.js'
import session from '../middlewares/session.js'
import { passportInitialize, passportSession } from '../middlewares/passport.js'
import { engine } from 'express-handlebars'

export const app = express()

app.engine('handlebars', engine())
app.set('views', './views')
app.set('view engine', 'handlebars')


app.use(express.static('./public'))
app.use(express.json())

app.use(session)

app.use(passportInitialize, passportSession)


app.use((req, res, next) => { console.log(`(${req.method}) ${req.url}`); next() })

app.use('/api', apiRouter)
