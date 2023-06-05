import { Router } from 'express'

import * as chatController from '../controllers/chat.controller.js'

export const chatRouter = Router()

chatRouter.get('/:id?', chatController.handleGet)
chatRouter.post('/', chatController.handlePost)
chatRouter.put('/:id', chatController.handlePut)
chatRouter.delete('/:id', chatController.handleDelete)
