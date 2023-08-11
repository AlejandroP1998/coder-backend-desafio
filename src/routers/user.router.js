import { Router } from 'express'

import * as userController from '../controllers/user.controller.js'
import { extraerTodo } from '../middlewares/docsManager.js'

export const userRouter = Router()

userRouter.get('/:id?', userController.handleGet)
userRouter.post('/', userController.handlePost)
userRouter.put('/:id?', userController.handlePut)
userRouter.delete('/:id', userController.handleDelete)
userRouter.post('/premium/:id?', userController.handleRolChange)
userRouter.post('/:id/documents',extraerTodo, userController.handleDocs)
