import { cartDaoMongoose } from '../daos/cart.dao.mongoose.js'
import { GenericRepository } from './GenericRepository.js'

export const cartRepository = new GenericRepository(cartDaoMongoose)