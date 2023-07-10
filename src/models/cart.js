import { randomUUID } from "crypto"

export class cart {
  #idCart
  #products
  constructor({
    idCart = randomUUID().replace('-','').slice(0,12),
    products = []
  }) {
    this.#idCart = idCart
    this.#products = products
  }
  dto() {
    return {
      idCart: this.#idCart,
      products: this.#products
    }
  }
}