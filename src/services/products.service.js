import productModel from "../daos/product.dao.mongoose.js"

class ProductService {
  constructor() {
    this.productsDB = productModel
  }

  async getProducts(limit = 10, page = 1, query = null, sort = 0) {

    const options = {
      page: page,
      limit: limit,
      select: query,
      sort: { price: sort }
    }

    const prod = await this.productsDB.paginate({}, options)
    return prod
  }

  async getProductsById(id){
    const prod = await this.productsDB.findById(id)
    return prod
  }
}

export const productService = new ProductService()