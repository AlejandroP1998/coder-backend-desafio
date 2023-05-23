import { Router } from 'express';
import { smsManager } from '../dao/DB/messages.manager.js';
import productsModel from '../dao/models/schemaProducts.js';
import { cartManager } from '../dao/DB/cart.manager.js';
import { autenticacion } from '../middlewares/autenticacion.js';
import passport from 'passport';
import { loginController, logoutController, registroController } from '../controllers/auth.controller.js';
import { autenticacionlogin } from '../middlewares/passport.js';

export const routerVistas = Router();

routerVistas.get('/', (req, res, next) => {
  res.redirect('/api/login/');
});


routerVistas.get('/api/messages', async (req, res, next) => {

  const mensajes = await smsManager.obtenerTodos()
  res.render('chat', {
    pageTitle: 'mensajes',
    hayMensajes: mensajes.length > 0,
    mensajes
  });
});

routerVistas.get('/api/products/', autenticacion, async (req, res, next) => {

  const opcionesDePaginacion = {
    limit: req.query.limit || 10, // tamaño de pagina: 5 por defecto
    page: req.query.page || 1, // devuelve la primera pagina por defecto
    lean: true // para que devuelva objetos literales, no de mongoose
  }

  //? Llamado a la base de datos con los productos
  let result = await productsModel.paginate({}, opcionesDePaginacion)

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

routerVistas.post('/api/register/', registroController)

routerVistas.post('/api/login/', autenticacionlogin ,loginController)

routerVistas.get('/api/carts/:cid', async (req, res, next) => {
  let productos = await cartManager.getProductsInCart(req.params.cid)
  res.render('carts', {
    pageTitle: 'Carrito',
    hayDocs: productos.products.length > 0,
    docs: productos.products
  })
})

routerVistas.get('/api/register/', async (req, res, next) => {
  res.render('register', {
    pageTitle: 'Registro'
  })
})

routerVistas.get('/api/login/', async (req, res, next) => {
  res.render('login', {
    pageTitle: 'Login'
  })
})

routerVistas.get('/logout', logoutController)

routerVistas.get('/api/sessions/current', async (req,res,next)=>{
  res.render('session',{
    pageTitle: 'Current user',
    userInfo: req.session.user
  })
})