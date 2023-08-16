import { randomUUID } from "crypto"
import { stringValido, validarEnteroPositivo } from "./validations/validations.js"

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
  #owner
  constructor({
    title,
    description,
    price,
    status = true,
    stock,
    thumbnails = [],
    category,
    owner = 'admin'
  }) {
    this.#idProduct = randomUUID().replace('-', '').slice(0, 12)
    this.#title = title
    this.#description = description
    this.#code = randomUUID().replace('-', '').slice(0, 6)
    this.#price = price
    this.#status = status
    this.#stock = stock
    this.#thumbnails = thumbnails
    this.#category = category
    this.#owner = owner
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
      category: this.#category,
      owner: this.#owner
    }
  }
}