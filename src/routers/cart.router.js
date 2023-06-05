import { Router } from 'express'

import * as cartController from '../controllers/cart.controller.js'

export const cartRouter = Router()

cartRouter.get('/:cid?', cartController.handleGet)
cartRouter.post('/', cartController.handlePost)
cartRouter.put('/:cid', cartController.handlePut)
cartRouter.delete('/:cid', cartController.handleDelete)
