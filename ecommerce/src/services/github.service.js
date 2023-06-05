export class userService {
  constructor() {
    this.usuarios = []
  }

  guardar(user) {
    this.usuarios.push(user)
  }

  buscarPorEmail(email) {
    const buscado = this.usuarios.find(u => u.email === email)
    if (!buscado) throw new Error('usuario no encontrado')
    // devuelvo una copia para imitar el comportamiento de una db
    return { ...buscado }
  }

  obtenerTodos() {
    // devuelvo una copia para imitar el comportamiento de una db
    return [...this.usuarios]
  }
}