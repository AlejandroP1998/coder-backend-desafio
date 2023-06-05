import { randomUUID } from "crypto"

export class cart {
  #idCart
  #products
  constructor({
    idCart = randomUUID(),
    products
  }) {
    this.#idCart = idCart
    this.#products = products
  }
  datos() {
    return {
      idCart: this.#idCart,
      products: this.#products
    }
  }
}