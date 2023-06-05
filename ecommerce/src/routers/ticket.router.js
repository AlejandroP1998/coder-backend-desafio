import { Router } from 'express'

import * as ticketController from '../controllers/ticket.controller.js'

export const ticketRouter = Router()

ticketRouter.get('/:id?', ticketController.handleGet)
ticketRouter.post('/', ticketController.handlePost)
ticketRouter.put('/:id', ticketController.handlePut)
ticketRouter.delete('/:id', ticketController.handleDelete)
