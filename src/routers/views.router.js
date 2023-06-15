import { Router } from "express";
import { autenticacion } from "../middlewares/autenticacion.js";
import { loginController, logoutController, registroController } from "../controllers/auth.controller.js";
import { autenticacionlogin } from "../middlewares/passport.js";
import productModel from "../daos/product.dao.mongoose.js";
import { chatRepository } from "../repositories/chat.repository.js";

export const viewsRouter = Router();

viewsRouter.get('/', (req, res, next) => {
  res.redirect('/api/login/');
});

viewsRouter.get('/chat', async (req, res, next) => {

  const mensajes = await chatRepository.readMany()
  console.log('req.session.user', req.session.user.rol )
  res.render('chat', {
    pageTitle: 'mensajes',
    hayMensajes: mensajes.length > 0,
    mensajes
  });
});

viewsRouter.get('/products/', autenticacion, async (req, res, next) => {

  const opcionesDePaginacion = {
    limit: req.query.limit || 10, // tamaño de pagina: 5 por defecto
    page: req.query.page || 1, // devuelve la primera pagina por defecto
    lean: true // para que devuelva objetos literales, no de mongoose
  }

  //? Llamado a la base de datos con los productos
  let result = await productModel.paginate({}, opcionesDePaginacion)
  const usuario = req.session['user']
  //console.log('usuario', usuario)

  res.render('products', {
    pageTitle: 'Productos',
    userInfo: usuario,
    hayDocs: result.docs.length > 0,
    docs: result.docs,
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

viewsRouter.post('/register', registroController)

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
  res.render('session', {
    pageTitle: 'Current user',
    userInfo: req.session.user
  })
})