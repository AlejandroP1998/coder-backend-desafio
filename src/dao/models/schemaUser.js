import { Schema, model } from "mongoose";
import mongoosePaginate from 'mongoose-paginate-v2'

const userCollection = 'users'

const schemaUser = new Schema({
  first_name: { type: String, required: true },
  last_name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  age: { type: Number, required: true },
  password: { type: String, required: true },
  rol: { type: String, required: true },
  cartId: {type: String ,required: true}
}, { versionKey: false });

schemaUser.plugin(mongoosePaginate)

const userModel = model(userCollection, schemaUser)

export default userModel