import mongoose, { Schema, model } from "mongoose";
import mongoosePaginate from 'mongoose-paginate-v2'

const cartsCollection = 'carts'

const schemaCart = new Schema({
  products: [{
    
    product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'products'
    },
    quantity: { type: Number }
  }
  ]
}, { versionKey: false });

schemaCart.plugin(mongoosePaginate)

const cartsModel = model(cartsCollection, schemaCart)

export default cartsModel