import mongoosePaginate from 'mongoose-paginate-v2'
import mongoose from 'mongoose'
import { DaoMongoose } from './DaoMongoose.js'

const cartSchema = new mongoose.Schema({
  idCart: { type: String, required: true },
  products: [{
    product: { type: String },
    quantity: { type: Number }
  }
  ]
}, { versionKey: false });

const cartModel = mongoose.model('carts', cartSchema)

cartSchema.plugin(mongoosePaginate)

export const cartDaoMongoose = new DaoMongoose(cartModel)
