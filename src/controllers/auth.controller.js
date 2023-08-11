import { cartService } from "../services/cart.service.js"
import { randomUUID } from "crypto"
import { userRepository } from "../repositories/user.repository.js"
import { user } from "../models/user.js"
import { emailService } from "../services/email.service.js"



export async function registroController(req, res, next) {
  const carrito = await cartService.addCart()
  const { first_name, last_name, email, age, password, documents } = req.body
  const usuarioCorrecto = new user({
    first_name: first_name,
    last_name: last_name,
    email: email,
    age: age,
    password: password,
    rol: email === 'adminCoder@coder.com' && password === 'adminCoder123' ? 'admin' : 'user',
    cartId: carrito.idCart,
    documents: documents === undefined ? [] : JSON.parse(documents)
  }).dto()
  //console.log('usuarioCorrecto.documents', usuarioCorrecto.documents)
  const usuario = await userRepository.create(usuarioCorrecto)
  //await emailService.send(usuario.email,`te doy la bienvenida ${usuario.first_name} a mi ecommerce`)
  req.login(usuario, error => {
    if (error) {
      next(new Error('fallo el registro'))
    } else {
      req.session.user = usuario
      res.status(201).json(req.user)
    }
  })
}

export async function loginController(req, res, next) {
  req.session.user = req.user
  req.session.rol = req.user.rol
  const opciones = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric', hour12: false };
  await userRepository.updateOne({ email: req.user.email }, { last_connection: new Date().toLocaleString('es-ES', opciones) })
  res.status(201).json(req.user)
}

export async function logoutController(req, res, next) {

  const opciones = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric', hour12: false };
  await userRepository.updateOne({ email: req.user.email }, { last_connection: new Date().toLocaleString('es-ES', opciones) })

  req.logout(err => {
    res.redirect('/api/')
  })
}

export async function resetPasswordController(req, res, next) {
  const token = randomUUID().replace('-', '').slice(0, 8)
  await emailService.sendPasswordResetMail(req.body.email, token)
  req.session.token = token
  setTimeout(function () {
    req.session.token = null
  }, 3600000);
  res.status(201).json(req.session.token)
}