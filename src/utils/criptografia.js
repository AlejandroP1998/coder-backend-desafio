import bcrypt from 'bcrypt'

export function hashear(elemento) {
  return bcrypt.hashSync(elemento,'$2b$10$otLeb5yiYiSs9QfkI3LKlO')
}

export function deshashear(recibida, almacenada){
  return bcrypt.compareSync(recibida,almacenada)
}