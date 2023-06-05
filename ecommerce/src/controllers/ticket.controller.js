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
    const creado = await ticketRepository.create(req.body)
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