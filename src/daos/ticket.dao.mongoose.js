import mongoose from 'mongoose'
import { DaoMongoose } from './DaoMongoose.js'

const ticketSchema = new mongoose.Schema({
  idTicket: { type: String, required: true },
  code: { type: String, required: true },
  purchase_datetime: { type: String, required: true },
  amount: { type: Number, required: true },
  purchaser: { type: String, required: true }
}, { versionKey: false })

const ticketModel = mongoose.model('tickets', ticketSchema)

export const ticketDaoMongoose = new DaoMongoose(ticketModel)
