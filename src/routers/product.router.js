import { Router } from 'express'

import * as productController from '../controllers/product.controller.js'
import { currentRol } from '../middlewares/rol.js'

export const productRouter = Router()

/* usar "currentRol" para validar que estas operaciones solo las puedan realizar los admin y usuarios premium */

productRouter.get('/:id?', productController.handleGet)
productRouter.post('/', productController.handlePost)
productRouter.put('/:id', productController.handlePut)
productRouter.delete('/:id', productController.handleDelete)
