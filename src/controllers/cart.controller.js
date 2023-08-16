import { cart } from '../models/cart.js'
import { cartRepository } from '../repositories/cart.repository.js'
import { productRepository } from '../repositories/product.repository.js'
import { cartService } from '../services/cart.service.js'
import { productService } from '../services/products.service.js'

/* Metodo para ver los productos de un carrito en especifico o ver los carritos */
export async function handleGet(req, res, next) {
  try {
    if (req.params.cid) {
      const buscado = await cartRepository.readOne({ idCart: req.params.cid })
      res.json(buscado.products)
    } else {
      const cart = await cartRepository.readMany(req.query)
      res.json(cart)
    }
  } catch (error) {
    next(error)
  }
}

/* Aqui creamos el carrito en la db */
export async function handlePost(req, res, next) {
  try {
    const carrito = new cart(req.body)
    const creado = await cartRepository.create(carrito.dto())
    res.status(201).json(creado)
  } catch (error) {
    next(error)
  }
}

/* metodo para añadir productos a un carrito en especifico */
export async function handleProdPost(req, res, next) {
  try {
    const prod = await productRepository.readOne({ idProduct: req.params.pid })
    if (prod) {
      const cart = await cartService.pushProduct(req.params.cid, prod)
      res.status(201).json(cart)
    } else {
      res.status(404).json({ "message": "No se encontro el producto" })
    }
  } catch (error) {
    next(error)
  }
}

/* Metodo para actualizar el carrito */
export async function handlePut(req, res, next) {
  try {
    const actualizado = await cartRepository.updateOne(req.params.cid, req.body)
    res.json(actualizado)
  } catch (error) {
    next(error)
  }
}

/* metodo para cambiar quentity de un producto */
export async function handleProdQuantity(req, res, next) {
  try {
    const prod = await productRepository.readOne({ idProduct: req.params.pid })
    const cart = await cartService.updateProduct(req.params.cid, prod, req.body.quantity)
    res.json(cart)
  } catch (error) {
    next(error)
  }
}

/* Metodo para eliminar el carrito o todos los productos del carrito */
export async function handleDelete(req, res, next) {
  try {
    const borrado = await cartRepository.deleteOne({ idCart: req.params.cid })
    res.status(201).json(borrado)
  } catch (error) {
    next(error)
  }
}

/* metodo para eliminar un elemento en especifico del carrito */
export async function handleProdDelete(req, res, next) {
  try {
    const prod = await productRepository.readOne({ idProduct: req.params.pid })
    if (prod) {
      const cart = await cartService.deleteProduct(req.params.cid, prod)
      res.json(cart)
    }
  } catch (error) {
    next(error)
  }
}