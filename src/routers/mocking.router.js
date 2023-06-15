import { Router } from 'express'

import * as mockingController from '../controllers/mocking.controller.js'

export const mockingRouter = Router()

mockingRouter.get('/mockingproducts', mockingController.handleGet)
/* mockingRouter.post('/', mockingController.handlePost)
mockingRouter.put('/:id', mockingController.handlePut)
mockingRouter.delete('/:id', mockingController.handleDelete) */
