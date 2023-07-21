import { Router } from 'express'

import * as cartController from '../controllers/cart.controller.js'

export const cartRouter = Router()

cartRouter.get('/:cid?', cartController.handleGet)
cartRouter.post('/', cartController.handlePost)
cartRouter.post('/:cid/products/:pid', cartController.handleProdPost)
cartRouter.put('/:cid', cartController.handlePut)
cartRouter.put('/:cid/products/:pid', cartController.handleProdQuantity)
cartRouter.delete('/:cid', cartController.handleDelete)
cartRouter.delete('/:cid/products/:pid', cartController.handleProdDelete)
