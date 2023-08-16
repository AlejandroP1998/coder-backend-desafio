import { Router } from 'express'

import * as productController from '../controllers/product.controller.js'
import { currentRol } from '../middlewares/rol.js'
import { extraerTodo } from '../middlewares/docsManager.js'

export const productRouter = Router()

productRouter.get('/:id?', currentRol, productController.handleGet)
productRouter.post('/', currentRol, extraerTodo,productController.handlePost)
productRouter.put('/:id', currentRol, productController.handlePut)
productRouter.delete('/:id', currentRol, productController.handleDelete)
