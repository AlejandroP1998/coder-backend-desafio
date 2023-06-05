import mongoosePaginate from 'mongoose-paginate-v2'
import mongoose from 'mongoose'
import { DaoMongoose } from './DaoMongoose.js'

const cartSchema = new mongoose.Schema({
  idCart: { type: String },
  products: [{
    product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'products'
    },
    quantity: { type: Number }
  }
  ]
}, { versionKey: false });

const cartModel = mongoose.model('carts', cartSchema)

cartSchema.plugin(mongoosePaginate)

export const cartDaoMongoose = new DaoMongoose(cartModel)
