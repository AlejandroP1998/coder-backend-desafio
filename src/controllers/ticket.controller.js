import { ticket } from '../models/ticket.js'
import { cartRepository } from '../repositories/cart.repository.js'
import { ticketRepository } from '../repositories/ticket.repository.js'

export async function handleGet(req, res, next) {
  try {
    if (req.params.id) {
      const buscado = await ticketRepository.readOne({ id: req.params.id })
      res.json(buscado)
    } else {
      const ticket = await ticketRepository.readMany(req.query)
      res.json(ticket)
    }
  } catch (error) {
    next(error)
  }
}

export async function handlePost(req, res, next) {
  try {
    const usuario = req.session['user']
    const cart = await cartRepository.readOne({ idCart: usuario.cartId })
    const creado = await ticketRepository.create(new ticket({ amount: cart.subTotal, purchaser: usuario.email }).dto())
    await cartRepository.updateOne({ idCart: usuario.cartId }, { products: [] })
    res.status(201).json(creado)
  } catch (error) {
    next(error)
  }
}

export async function handlePut(req, res, next) {
  try {
    const actualizado = await ticketRepository.updateOne(req.params.id, req.body)
    res.json(actualizado)
  } catch (error) {
    next(error)
  }
}

export async function handleDelete(req, res, next) {
  try {
    const borrado = await ticketRepository.deleteOne(req.params.id)
    res.json(borrado)
  } catch (error) {
    next(error)
  }
}