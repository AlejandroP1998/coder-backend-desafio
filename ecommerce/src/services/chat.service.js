import { chatDaoMongoose } from "../daos/chat.dao.mongoose.js"

export class chatService {
  constructor() {
    this.chatDB = chatDaoMongoose
  }

  async guardar(ms) {
    const sms = await this.chatDB.create(ms)
    return sms
  }

  async obtenerTodos() {
    const sms = await this.chatDB.find().lean()
    return sms
  }

  async obtenerPorId(id) {
    const sms = await this.chatDB.findById(id).lean()
    return sms
  }
}