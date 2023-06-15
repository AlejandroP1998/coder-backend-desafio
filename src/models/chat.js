import { randomUUID } from "crypto"

export class chat {
  #idChat
  #user
  #message
  constructor({
    idChat = randomUUID(),
    user,
    message
  }) {
    this.#idChat = idChat
    this.#user = user
    this.#message = message
  }
  dto() {
    return {
      idChat: this.#idChat,
      user: this.#user,
      message: this.#message
    }
  }
}