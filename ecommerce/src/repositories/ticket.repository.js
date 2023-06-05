import { ticketDaoMongoose } from '../daos/ticket.dao.mongoose.js'
import { GenericRepository } from './GenericRepository.js'

export const ticketRepository = new GenericRepository(ticketDaoMongoose)