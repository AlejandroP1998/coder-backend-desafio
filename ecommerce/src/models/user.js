import { randomUUID } from "crypto"
import { hashear } from "../utils/criptografia.js"

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
    idUser = randomUUID(),
    first_name,
    last_name,
    email,
    age,
    password,
    rol = 'user',
    cartId
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

  datos() {
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