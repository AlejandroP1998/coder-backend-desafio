import { Router } from 'express'

import * as userController from '../controllers/user.controller.js'

export const userRouter = Router()

userRouter.get('/:id?', userController.handleGet)
userRouter.post('/', userController.handlePost)
userRouter.put('/:id', userController.handlePut)
userRouter.delete('/:id', userController.handleDelete)
