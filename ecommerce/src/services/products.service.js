import { productDaoMongoose } from "../daos/product.dao.mongoose.js"

class productsManager {
  constructor() {
    this.productsDB = productDaoMongoose
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

  async getProductsLimited(limit) {
    const prodsLimited = await this.productsDB.find().limit(limit).lean()
    return prodsLimited
  }

  async addProduct(product) {
    const prod = await this.productsDB.create(product)
    return prod
  }

  async getProductById(id) {
    const prod = await this.productsDB.findById(id).lean()
    return prod
  }

  async updateProduct(id, update) {
    const filter = { _id: new ObjectId(id) };
    const prod = await this.productsDB.findByIdAndUpdate(filter, update)
    return prod
  }

  async deleteProduct(id) {
    await this.productsDB.deleteOne({ _id: new ObjectId(id) })
    return
  }

}

export const prodManager = new productsManager()