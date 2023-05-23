import { cartManager } from "../dao/DB/cart.manager.js"
import userModel from "../dao/models/schemaUser.js"
import { hashear } from "../utils/criptografia.js"

export async function registroController(req, res, next) {
  const carrito = await cartManager.addCart({ "products": [] })
  const { first_name, last_name, email, age, password, rol } = req.body
  //console.log('cartId', carrito._id)
  const cartId = carrito._id
  const user = await userModel.create({ first_name, last_name, email, age, password: hashear(password), rol, cartId })
  req.login(user, error => {
    if (error) {
      next(new Error('fallo el registro'))
    } else {
      req.session.user = user
      res.status(201).json(req.user)
    }
  })
}

export async function loginController(req, res, next) {
  req.session.user = req.user
  res.status(201).json(req.user)
}

export async function logoutController(req, res, next) {
  // lo que estaba acá lo reemplacé por el atajo que me provee passport
  req.logout(err => {
    res.redirect('/')
  })
}