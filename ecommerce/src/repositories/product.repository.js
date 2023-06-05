import { productDaoMongoose } from '../daos/product.dao.mongoose.js'
import { GenericRepository } from './GenericRepository.js'

export const productRepository = new GenericRepository(productDaoMongoose)