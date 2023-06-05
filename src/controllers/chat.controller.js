import { chatRepository } from '../repositories/chat.repository.js'

export async function handleGet(req, res, next) {
  try {
    if (req.params.id) {
      const buscado = await chatRepository.readOne({ id: req.params.id })
      res.json(buscado)
    } else {
      const chat = await chatRepository.readMany(req.query)
      res.json(chat)
    }
  } catch (error) { 
    next(error)
  }
}

export async function handlePost(req, res, next) {
  try {
    const creado = await chatRepository.create(req.body)
    res.status(201).json(creado)
  } catch (error) { 
    next(error)
  }
}

export async function handlePut(req, res, next) {
  try {
    const actualizado = await chatRepository.updateOne(req.params.id, req.body)
    res.json(actualizado)
  } catch (error) { 
    next(error)
  }
}

export async function handleDelete(req, res, next) {
  try {
    const borrado = await chatRepository.deleteOne(req.params.id)
    res.json(borrado)
  } catch (error) { 
    next(error)
  }
}