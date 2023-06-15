import { createProductMock } from "../mocks/productMock.js"

export async function handleGet(req, res, next) {
  try {
    const productos = []
    for (let i = 0; i < 100; i++) {
      productos.push(createProductMock().dto())
    }
    res.json(productos)
  } catch (error) {
    next(error)
  }
}

/* export async function handlePost(req, res, next) {
  try {
    const creado = await mockingRepository.create(req.body)
    res.status(201).json(creado)
  } catch (error) { 
    next(error)
  }
}

export async function handlePut(req, res, next) {
  try {
    const actualizado = await mockingRepository.updateOne(req.params.id, req.body)
    res.json(actualizado)
  } catch (error) { 
    next(error)
  }
}

export async function handleDelete(req, res, next) {
  try {
    const borrado = await mockingRepository.deleteOne(req.params.id)
    res.json(borrado)
  } catch (error) { 
    next(error)
  }
} */