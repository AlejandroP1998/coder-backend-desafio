import { Router } from 'express'
import { ticketRouter } from './ticket.router.js'
import { cartRouter } from './cart.router.js'
import { chatRouter } from './chat.router.js'
import { productRouter } from './product.router.js'
import { userRouter } from './user.router.js'
import { viewsRouter } from './views.router.js'

export const apiRouter = Router()

apiRouter.use('/ticket', ticketRouter)
apiRouter.use('/cart', cartRouter)
apiRouter.use('/chat', chatRouter)
apiRouter.use('/product', productRouter)
apiRouter.use('/user', userRouter)
apiRouter.use('/', viewsRouter)