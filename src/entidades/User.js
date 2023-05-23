export class User {
  constructor({ email, password, nombre, apellido, edad, rol }) {
    this.email = email
    this.password = password
    this.nombre = nombre
    this.apellido = apellido
    this.edad = edad
    this.rol = rol
  }
}