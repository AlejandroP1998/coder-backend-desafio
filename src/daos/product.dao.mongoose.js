import mongoosePaginate from 'mongoose-paginate-v2'
import mongoose from 'mongoose'
import { DaoMongoose } from './DaoMongoose.js'

const productSchema = new mongoose.Schema({
  idProduct: { type: String, required: true } ,
  title: { type: String, required: true },
  description: { type: String, required: true },
  code: { type: String, required: true },
  price: { type: Number, required: true },
  status: { type: Boolean, required: true },
  stock: { type: Number, required: true },
  category: { type: String, required: true },
  thumbnails: { type: Array, required: false }
}, { versionKey: false });

productSchema.plugin(mongoosePaginate)

const productModel = mongoose.model('products', productSchema)
export default productModel
export const productDaoMongoose = new DaoMongoose(productModel)
