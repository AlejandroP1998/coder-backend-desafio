import express from 'express'
import { PORT } from '../config/servidor.config.js'
import { engine } from 'express-handlebars'
import { routerApi } from '../routers/routerApi.js'
import { routerVistas } from '../routers/routerVistas.js'
import { conectar } from '../database/mongoose.js'
import { productsRouter } from '../routers/productsRouter.js'
import { cartsRouter } from '../routers/cartsRouter.js'
import session from '../middlewares/session.js'
import { passportInitialize, passportSession } from '../middlewares/passport.js'
import { githubRouter } from '../routers/githubRouter.js'



await conectar()

const app = express()

app.engine('handlebars', engine())
app.set('views', './views')
app.set('view engine', 'handlebars')


app.use(express.static('./public'))
app.use(express.json())

app.use(session)

app.use(passportInitialize, passportSession)

app.use('/api', routerApi)
app.use('/', routerVistas)
/* Router para los productos */
app.use("/api/products", productsRouter)
/* Router para los carritos */
app.use("/api/carts", cartsRouter)
app.use('/api/sessions/', githubRouter)


app.listen(PORT, () => {
  console.log(`servidor escuchando en puerto ${PORT}`)
})
