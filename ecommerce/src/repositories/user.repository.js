import { userDaoMongoose } from '../daos/user.dao.mongoose.js'
import { GenericRepository } from './GenericRepository.js'

export const userRepository = new GenericRepository(userDaoMongoose)