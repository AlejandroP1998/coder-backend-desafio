import { Router } from "express";
import { autenticacion } from "../middlewares/autenticacion.js";
import { loginController, logoutController, registroController, resetPasswordController } from "../controllers/auth.controller.js";
import { autenticacionlogin } from "../middlewares/passport.js";
import productModel from "../daos/product.dao.mongoose.js";
import { chatRepository } from "../repositories/chat.repository.js";
import compression from "express-compression";
import path from 'path'
import { winstonLogger as logger } from "../utils/logger.js";
import { extraerFotoDePerfil, extraerTodo } from "../middlewares/docsManager.js";
import { productRepository } from "../repositories/product.repository.js";
import { cartRepository } from "../repositories/cart.repository.js";
import { userRepository } from "../repositories/user.repository.js";


export const viewsRouter = Router();

viewsRouter.get('/', (req, res, next) => {
  res.redirect('/api/login/');
});

viewsRouter.get('/chat', async (req, res, next) => {

  const mensajes = await chatRepository.readMany()
  res.render('chat', {
    pageTitle: 'mensajes',
    hayMensajes: mensajes.length > 0,
    mensajes
  });
});

viewsRouter.get('/products/', compression(), autenticacion, async (req, res, next) => {

  const opcionesDePaginacion = {
    limit: req.query.limit || 12, // tamaño de pagina
    page: req.query.page || 1, // devuelve la primera pagina por defecto
    lean: true // para que devuelva objetos literales, no de mongoose
  }

  //? Llamado a la base de datos con los productos
  let result = await productModel.paginate({}, opcionesDePaginacion)
  const usuario = req.session['user']
  const img = usuario.documents.find(e => e.name === 'profile picture')
  res.render('products', {
    pageTitle: 'Productos',
    userInfo: usuario,
    hayDocs: result.docs.length > 0,
    docs: result.docs,
    img: img === undefined ? "/imgs/noProfilePicture.jpg" : '/resources/profiles/' + img.reference,
    rol: usuario.rol === 'user',
    isAdmin: usuario.rol === 'admin',
    limit: result.limit,
    page: result.page,
    totalPages: result.totalPages,
    hasNextPage: result.hasNextPage,
    nextPage: result.nextPage,
    hasPrevPage: result.hasPrevPage,
    prevPage: result.prevPage,
    pagingCounter: result.pagingCounter,
  })
})

viewsRouter.get('/products/misProductos', async (req, res, next) => {
  const usuario = req.session['user']
  let result
  if (usuario.rol === 'admin') {
    result = await productRepository.readMany()
  } else {
    result = await productRepository.readMany({ owner: usuario.idUser })
  }

  res.render('misProductos', {
    pageTitle: 'Mis productos',
    hayDocs: result.length > 0,
    docs: result
  })
})


viewsRouter.get('/products/misProductos/create', async (req, res, next) => {
  const usuario = req.session['user']
  res.render('createProduct', {
    pageTitle: 'Crear',
    owner: usuario.idUser
  })
})




viewsRouter.post('/register', extraerFotoDePerfil, registroController)


viewsRouter.post('/login/', autenticacionlogin, loginController)


viewsRouter.get('/cart/:cid', async (req, res, next) => {
  let productos = await cartManager.getProductsInCart(req.params.cid)
  res.render('carts', {
    pageTitle: 'Carrito',
    hayDocs: productos.products.length > 0,
    docs: productos.products
  })
})

viewsRouter.get('/register/', async (req, res, next) => {
  res.render('register', {
    pageTitle: 'Registro'
  })
})

viewsRouter.get('/login/', async (req, res, next) => {
  res.render('login', {
    pageTitle: 'Login'
  })
})

viewsRouter.get('/logout', logoutController)

viewsRouter.get('/sessions/current', async (req, res, next) => {
  const usuario = req.session['user']
  const img = usuario.documents.find(e => e.name === 'profile picture')
  res.render('session', {
    pageTitle: 'Current user',
    userInfo: usuario,
    img: img ? img.reference : null
  })
})

viewsRouter.get('/loggerTest', async (req, res, next) => {
  const options = {
    root: path.join('./')
  };
  res.sendFile('events.log', options, function (err) {
    if (err) {
      next(err);
    } else {
      req.logger.info('events.log');
    }
  })
})


//+Recuperacion de contraseña
viewsRouter.get('/account/password/request', async (req, res, next) => {
  res.render('resetRequest', {
    pageTitle: 'Request password'
  })
})

viewsRouter.post('/account/password/reset/', resetPasswordController)

viewsRouter.get('/account/password/reset/:token', async (req, res, next) => {
  if (req.session.token === req.params.token) {
    logger.info('token de restauracion de contraseña valido')
    res.render('resetPassword', {
      pageTitle: 'Reset password'
    })
  } else {
    logger.error('token de restauracion de contraseña invalido')
    res.redirect('/api/login')
  }
})


viewsRouter.get('/myCart', async (req, res, next) => {
  const usuario = req.session['user']
  const carrito = await cartRepository.readOne({ idCart: usuario.cartId })


  res.render('MyCart', {
    pageTitle: 'Mi Carrito',
    hayItems: carrito.products[0],
    elements: carrito.products,
    total: carrito.subTotal,
    id: usuario.cartId
  })
})


viewsRouter.get('/premium/', async (req, res, next) => {
  const usuario = req.session['user']
  const img = usuario.documents.find(e => e.name === 'profile picture')
  res.render('premium', {
    pageTitle: 'Premium',
    userInfo: usuario,
    img: img ? img.reference : null
  })
})

viewsRouter.get('/userList', async (req,res,next) => {
  const users = await userRepository.readMany()
  res.render('userList', {
    pageTitle:'Lista de usuarios',
    hayUsuarios: users.length > 0,
    usuario: users
  })
})