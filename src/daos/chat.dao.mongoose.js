import mongoose from 'mongoose'
import { DaoMongoose } from './DaoMongoose.js'

const chatSchema = new mongoose.Schema({
  idChat: { type: String, required: false},
  user: { type: String, required: true },
  message: { type: String, required: true }
}, { versionKey: false });

const chatModel = mongoose.model('chat', chatSchema)

export const chatDaoMongoose = new DaoMongoose(chatModel)
