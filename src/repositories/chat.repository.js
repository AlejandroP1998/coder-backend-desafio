import { chatDaoMongoose } from '../daos/chat.dao.mongoose.js'
import { GenericRepository } from './GenericRepository.js'

export const chatRepository = new GenericRepository(chatDaoMongoose)