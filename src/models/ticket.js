import { randomUUID } from "crypto"

export class ticket {
  #idTicket
  #code
  #purchase_datetime
  #amount
  #purchaser
  constructor({
    idTicket = randomUUID().replace('-', '').slice(0, 12),
    code,
    purchase_datetime,
    amount,
    purchaser
  }) {
    this.#idTicket = idTicket
    this.#code = code
    this.#purchase_datetime = purchase_datetime
    this.#amount = amount
    this.#purchaser = purchaser
  }

  dto() {
    return {
      idTicket: this.#idTicket,
      code: this.#code,
      purchase_datetime: this.#purchase_datetime,
      amount: this.#amount,
      purchaser: this.#purchaser
    }
  }
}