
import { Products } from '../models/product.model.js'
export class ProductManager {
  constructor () {
    this.path = './database/products.json'
    this.products = Products
  }

  async getProducts () {
    const result = await this.products.find({status: 'true'}).lean()
    return result
  }

  async addProduct (data) {
    const newProduct = await this.products.create(data)
    return newProduct
  }

  async getProductById (id) {
    const product = await this.products.find({ _id: id })
    return product
  }

  async updateProduct (id, data) {
    const productUpdated = await this.products.findByIdAndUpdate({ _id: id }, data)
    return productUpdated
  }

  async deleteProduct (id) {
    const productUpdated = await this.products.findByIdAndUpdate({ _id: id }, { status: 'deleted' })
    return productUpdated
  }
}
