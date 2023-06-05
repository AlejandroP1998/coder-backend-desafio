import mongoose from 'mongoose'
import { DaoMongoose } from './DaoMongoose.js'

const ticketSchema = new mongoose.Schema({
  idTicket: { type: String, required: false },
  code: { type: String, required: true },
  purchase_datetime: { type: Date, required: true },
  amount: { type: Number, required: true },
  purchaser: { type: String, required: true }
}, { versionKey: false })

const ticketModel = mongoose.model('tickets', ticketSchema)

export const ticketDaoMongoose = new DaoMongoose(ticketModel)
