import { Router } from 'express'

import * as productController from '../controllers/product.controller.js'

export const productRouter = Router()

productRouter.get('/:id?', productController.handleGet)
productRouter.post('/', productController.handlePost)
productRouter.put('/:id', productController.handlePut)
productRouter.delete('/:id', productController.handleDelete)
