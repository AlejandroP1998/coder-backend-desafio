import mongoose from 'mongoose'
import { DaoMongoose } from './DaoMongoose.js'

const userSchema = new mongoose.Schema({
  idUser: { type: String, required: true },
  first_name: { type: String, required: true },
  last_name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  age: { type: Number, required: true },
  password: { type: String, required: true },
  rol: { type: String, enum: ['admin', 'user'], required: true },
  cartId: { type: String, required: true },
  documents: [
    {
      name: { type: String },
      reference: { type: String }
    }
  ],
  last_connection: {type: String, required: true}
}, { versionKey: false });

const userModel = mongoose.model('users', userSchema)

export const userDaoMongoose = new DaoMongoose(userModel)
