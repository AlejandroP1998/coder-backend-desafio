import { cart } from "../models/cart.js"
import { cartRepository } from "../repositories/cart.repository.js"
import { winstonLogger as logger } from "../utils/logger.js"
class CartService {

  async addCart() {
    const carrito = await cartRepository.create(new cart({ "products": [] }).dto())
    return carrito
  }

  async getProductsInCart(id) {
    const cart = await cartRepository.readOne({ idCart: id }).populate('products.product').lean()
    return cart

  }

  async pushProduct(id, product) {
    const cart = await cartRepository.readOne({ idCart: id })
    //console.log('product.idProduct', product.idProduct)
    /* cart.products.forEach(element => {
      console.log(element.product)
    }); */
    const finded = cart.products.some((prod) => prod.product === product.idProduct)
    if (finded) {
      logger.info(`producto con id: ${product.idProduct} encontrado en la base de datos`)
      const index = cart.products.findIndex((prod) => prod.product === product.idProduct)
      cart.products[index].quantity += 1
    } else {
      cart.products.push({ product: product.idProduct, quantity: 1 })
    }
    const filter = { idCart: id }
    const carrito = await cartRepository.updateOne(filter, { products: cart.products })
    return carrito
  }

  async deleteProduct(id, product) {
    const cart = await cartRepository.readOne({ idCart: id })
    const finded = cart.products.some((prod) => prod.product.idProduct === product.idProduct)
    if (finded) {
      const index = cart.products.findIndex((prod) => prod.product.idProduct === product.idProduct)
      cart.products.splice(index, 1)
    }
    const filter = { idCart: id }
    const carrito = await cartRepository.updateOne(filter, { products: cart.products })
    return carrito
  }

  async updateCart(id, products) {
    const filter = { idCart: id }
    const carrito = await cartRepository.updateOne(filter, { products: products }).lean().populate('products.product')
    return carrito
  }

  async updateProduct(id, product, quantity) {
    const cart = await cartRepository.readOne({ idCart: id })
    const index = cart.products.findIndex((prod) => prod.product.idProduct === product.idProduct)
    cart.products[index].quantity = quantity
    const filter = { idCart: id }
    const carrito = await cartRepository.updateOne(filter, { products: cart.products })
    return carrito
  }

  async deleteProducts(id) {
    const filter = { idCart: id }
    const carrito = await cartRepository(filter, { products: [] })
    return carrito
  }
}

export const cartService = new CartService()