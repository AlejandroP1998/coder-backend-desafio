import { ticket } from '../models/ticket.js'
import { cartRepository } from '../repositories/cart.repository.js'
import { productRepository } from '../repositories/product.repository.js'
import { ticketRepository } from '../repositories/ticket.repository.js'
import { emailService } from '../services/email.service.js'

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
    let mensaje = '<h1>Detalle de compra</h1><br><ul><br>'
    const usuario = req.session['user']
    const cart = await cartRepository.readOne({ idCart: usuario.cartId })
    let i = 0
    const compra = []
    while(cart.products[i]){
      const prod = await productRepository.readOne({idProduct: cart.products[i].id})
      let num1 = parseInt(prod.stock)
      let num2 = parseInt(cart.products[i].quantity)
      let resta = num1 - num2
      if(resta > 0){
        compra.push(cart.products[i])
      }else{
        mensaje = mensaje + `<li>El producto: ${cart.products[i].title} no pudo procesarce ya que la cantidad: ${cart.products[i].quantity} exedia el stock</li><br>` 
      }
      i++
    }
    let total = 0
    compra.forEach(product => {
      mensaje = mensaje + `<li>Producto: ${product.title} - Precio: $${product.price} - Cantidad: ${product.quantity}</li><br>` 
      total += product.total
    });
    mensaje = mensaje + '</ul><br>'
    const creado = await ticketRepository.create(new ticket({ amount: total, purchaser: usuario.email }).dto())
    mensaje = mensaje + `<h2>SubTotal: ${total} </h2><br>
    <h2>Codigo de ticket: ${creado.code}</h2><br>
    <h2>Email de comprador: ${creado.purchaser}</h2><br>`
    await emailService.send(usuario.email,mensaje)
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