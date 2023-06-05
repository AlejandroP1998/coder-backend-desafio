import { randomUUID } from "crypto"

export class product {
  #idProduct
  #title
  #description
  #code
  #price
  #status
  #stock
  #thumbnails
  constructor({
    idProduct = randomUUID(),
    title,
    description,
    code,
    price,
    status,
    stock,
    thumbnails
  }) {
    this.#idProduct = idProduct
    this.#title = title
    this.#description = description
    this.#code = code
    this.#price = price
    this.#status = status
    this.#stock = stock
    this.#thumbnails = thumbnails
  }
  datos() {
    return {
      idProduct: this.#idProduct,
      title: this.#title,
      description: this.#description,
      code: this.#code,
      price: this.#price,
      status: this.#status,
      stock: this.#stock,
      thumbnails: this.#thumbnails
    }
  }
}