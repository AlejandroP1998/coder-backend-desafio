import { productRepository } from '../repositories/product.repository.js'
import { productService } from '../services/products.service.js'

export async function handleGet(req, res, next) {
  try {
    if (req.params.id) {
      const buscado = await productRepository.readOne({ id: req.params.id })
      res.json(buscado)
    } else {
      const limite = parseInt(req.query.limit)
      const page = parseInt(req.query.page)
      const query = req.query.query
      const sort = req.query.sort

      const products = await productService.getProducts(isNaN(limite) ? 10 : limite, page, query, sort === 'asc' ? 1 : -1)
      const limit = limite ? limite : "10"
      res.json({ status: "success - Mostrando " + limit + " productos", payload: products })
    }
  } catch (error) { 
    next(error)
  }
}

export async function handlePost(req, res, next) {
  try {
    const creado = await productRepository.create(req.body)
    res.status(201).json(creado)
  } catch (error) { 
    next(error)
  }
}

export async function handlePut(req, res, next) {
  try {
    const actualizado = await productRepository.updateOne(req.params.id, req.body)
    res.json(actualizado)
  } catch (error) { 
    next(error)
  }
}

export async function handleDelete(req, res, next) {
  try {
    const borrado = await productRepository.deleteOne(req.params.id)
    res.json(borrado)
  } catch (error) { 
    next(error)
  }
}