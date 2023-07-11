import { cartService } from "../services/cart.service.js"
import { randomUUID} from "crypto"
import { userRepository } from "../repositories/user.repository.js"
import { user } from "../models/user.js"
import { emailService } from "../services/email.service.js"


export async function registroController(req, res, next) {
  const carrito = await cartService.addCart()
  const { first_name, last_name, email, age, password} = req.body
  const usuario = await userRepository.create(new user({
    first_name:first_name, 
    last_name:last_name,
    email:email,
    age:age,
    password:password,
    rol: email ==='adminCoder@coder.com' && password === 'adminCoder123' ? 'admin' : 'user',
    cartId: carrito.idCart
  }).dto())
  await emailService.send(usuario.email,`te doy la bienvenida ${usuario.first_name} a mi ecommerce`)
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
  //console.log('req.user.rol', req.user.rol)
  //console.log('req.user', req.user)
  res.status(201).json(req.user)
}

export async function logoutController(req, res, next) {
  // lo que estaba acá lo reemplacé por el atajo que me provee passport
  req.logout(err => {
    res.redirect('/api/')
  })
}

export async function resetPasswordController(req,res,next){
  const token = randomUUID.replace('-','').slice(0,8)
  await emailService.sendPasswordResetMail(req.session.user.email,token)
  req.session.passwordToken = token
  res.status(201)
  setTimeout(function () {
    req.session.passwordToken = null
  }, 3600000);
  res.status(404)
}