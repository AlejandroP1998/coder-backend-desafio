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
  #category
  constructor({
    idProduct = randomUUID(),
    title,
    description,
    code,
    price,
    status = true,
    stock,
    thumbnails = [],
    category
  }) {
    this.#idProduct = idProduct
    this.#title = title
    this.#description = description
    this.#code = code
    this.#price = price
    this.#status = status
    this.#stock = stock
    this.#thumbnails = thumbnails
    this.#category = category
  }
  dto() {
    return {
      idProduct: this.#idProduct,
      title: this.#title,
      description: this.#description,
      code: this.#code,
      price: this.#price,
      status: this.#status,
      stock: this.#stock,
      thumbnails: this.#thumbnails,
      category: this.#category
    }
  }
}