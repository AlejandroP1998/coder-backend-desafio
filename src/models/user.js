import { randomUUID } from "crypto"
import { hashear } from "../utils/criptografia.js"
import { cartRouter } from "../routers/cart.router.js"
import { cartRepository } from "../repositories/cart.repository.js"
import { cart } from "./cart.js"

export class user {
  #idUser
  #first_name
  #last_name
  #email
  #age
  #password
  #rol
  #cartId

  constructor({
    idUser = randomUUID().replace('-','').slice(0,12),
    first_name,
    last_name,
    email,
    age,
    password,
    rol = 'user',
    cartId = cartRepository.create(cart.dto().cartId)
  }) {
    this.#idUser = idUser
    this.#first_name = first_name
    this.#last_name = last_name
    this.#email = email
    this.#age = age
    this.#password = hashear(password)
    this.#rol = rol
    this.#cartId = cartId
  }

  dto() {
    return {
      idUser: this.#idUser,
      first_name: this.#first_name,
      last_name: this.#last_name,
      email: this.#email,
      age: this.#age,
      password: this.#password,
      rol: this.#rol,
      cartId: this.#cartId
    }
  }
}