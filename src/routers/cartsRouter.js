import { Router } from "express"
import { cartManager } from "../dao/DB/cart.manager.js"
import { prodManager } from "../dao/DB/products.manager.js"

export const cartsRouter = Router()

/* ---------------------------------------------------- CARRITO ------------------------------------------------------------------- */
/* Metodo para crear carritos */
cartsRouter.post('/', async (req, res) => {
  const cart = await cartManager.addCart(req.body)
  cart ?
    res.json(cart)
    : res.json({ "message": "No se creo el carrito" })
})

/* Metodo para ver los productos dentro de un carrito en especifico */
cartsRouter.get('/:cid', async (req, res) => {
  const cart = await cartManager.getProductsInCart(req.params.cid)
  res.json({ status: "success - Productos en el carrito con id: " + req.params.cid, payload: cart.products })
})

/* Metodo para agregar productos a un carrito especifico */
cartsRouter.post('/:cid/products/:pid', async (req, res) => {
  const prod = await prodManager.getProductById(req.params.pid)
  if (prod) {
    const cart = await cartManager.pushProduct(req.params.cid, prod)
    res.json(cart)
  } else {
    res.json({ "message": "No existe el producto en la base de datos" })
  }
})

// Elimina del carrito el producto seleccionado
cartsRouter.delete('/:cid/products/:pid', async (req, res) => {
  const prod = await prodManager.getProductById(req.params.pid)
  if (prod) {
    const cart = await cartManager.deleteProduct(req.params.cid, prod)
    res.json(cart)
  } else {
    res.json({ "message": "No existe el producto en la base de datos" })
  }
})

//Actualiza el arreglo completo de productos del carrito
cartsRouter.put('/:cid', async (req, res) => {
  const cart = await cartManager.updateCart(req.params.cid, req.body)
  res.json(cart)
})

//Actualiza la cantidad de ejemplares de un producto dentro del carrito
cartsRouter.put('/:cid/products/:pid', async (req, res) => {
  try {
    const prod = await prodManager.getProductById(req.params.pid)
    const cart = await cartManager.updateProduct(req.params.cid, prod, req.body.quantity)
    res.json(cart)
  } catch (error) {
    res.json({ "message": "No existe el producto en la base de datos" })
  }
})

//Elimina todos los productos del carrito
cartsRouter.delete('/:cid', async (req, res) => {
  const cart = await cartManager.deleteProducts(req.params.cid)
  res.json(cart)
})