import { cart } from '../models/cart.js'
import { cartRepository } from '../repositories/cart.repository.js'

export async function handleGet(req, res, next) {
  try {
    if (req.params.cid) {
      const buscado = await cartRepository.readOne({ id: req.params.cid })
      res.json(buscado)
    } else {
      const cart = await cartRepository.readMany(req.query)
      res.json(cart)
    }
  } catch (error) { 
    next(error)
  }
}

export async function handlePost(req, res, next) {
  try {
    const carrito = new cart(req.body)
    const creado = await cartRepository.create(carrito.datos())
    res.status(201).json(creado)
  } catch (error) { 
    next(error)
  }
}

export async function handlePut(req, res, next) {
  try {
    const actualizado = await cartRepository.updateOne(req.params.cid, req.body)
    res.json(actualizado)
  } catch (error) { 
    next(error)
  }
}

export async function handleDelete(req, res, next) {
  try {
    const borrado = await cartRepository.deleteOne(req.params.cid)
    res.json(borrado)
  } catch (error) { 
    next(error)
  }
}