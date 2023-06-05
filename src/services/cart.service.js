import { cart } from "../models/cart.js"
import { cartRepository } from "../repositories/cart.repository.js"

class CartService {

  async addCart() {
    const carrito = await cartRepository.create(new cart({ "products": [] }).datos())
    return carrito
  }

  async getProductsInCart(id) {
    const cart = await this.cartDB.findById(id).populate('products.product').lean()
    return cart

  }

  async pushProduct(id, product) {
    const cart = await this.cartDB.findById(id).lean()
    const finded = cart.products.some((prod) => prod.product._id.toString() === product._id.toString())
    if (finded) {
      const index = cart.products.findIndex((prod) => prod.product._id.toString() === product._id.toString())
      cart.products[index].quantity += 1
    } else {
      cart.products.push({ product: product, quantity: 1 })
    }

    //console.log('carts',cart.products )
    const filter = { _id: new ObjectId(id) }
    const carrito = await this.cartDB.findOneAndUpdate(filter, { products: cart.products }).populate('products').lean()
    return carrito
  }

  async deleteProduct(id, product) {
    const cart = await this.cartDB.findById(id)
    const finded = cart.products.some((prod) => prod.product._id.toString() === product._id.toString())
    //console.log('finded', finded)
    if (finded) {
      const index = cart.products.findIndex((prod) => prod.product._id.toString() === product._id.toString())
      //console.log('index', index)
      cart.products.splice(index, 1)
      //console.log('cart.products', cart.products)

      //console.log('cart.products[index]', cart.products[index])

    }
    const filter = { _id: new ObjectId(id) }
    const carrito = await this.cartDB.findOneAndUpdate(filter, { products: cart.products })
    return carrito
  }

  async updateCart(id, products) {
    //console.log('products', products)

    const filter = { _id: new ObjectId(id) }
    const carrito = await this.cartDB.findOneAndUpdate(filter, { products: products }).lean().populate('products.product')
    return carrito
  }

  async updateProduct(id, product, quantity) {
    const cart = await this.cartDB.findById(id)
    const index = cart.products.findIndex((prod) => prod.product._id.toString() === product._id.toString())
    cart.products[index].quantity = quantity
    const filter = { _id: new ObjectId(id) }
    const carrito = await this.cartDB.findOneAndUpdate(filter, { products: cart.products })
    return carrito
  }

  async deleteProducts(id) {
    const filter = { _id: new ObjectId(id) }
    const carrito = await this.cartDB.findOneAndUpdate(filter, { products: [] })
    return carrito
  }
}

export const cartService = new CartService()