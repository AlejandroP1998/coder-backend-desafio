import mongoosePaginate from 'mongoose-paginate-v2'
import mongoose from 'mongoose'
import { DaoMongoose } from './DaoMongoose.js'

const cartSchema = new mongoose.Schema({
  idCart: { type: String, required: true },
  products: [{
    id: { type: String },
    title: { type: String },
    price: { type: Number },
    quantity: { type: Number, default: 1 },
    total: { type: Number },
    image: { type: String }
  }
  ],
  subTotal: {type :Number}
}, { versionKey: false });

export const cartModel = mongoose.model('carts', cartSchema)

cartSchema.plugin(mongoosePaginate)

export const cartDaoMongoose = new DaoMongoose(cartModel)
