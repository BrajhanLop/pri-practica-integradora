import fs from 'fs/promises'
import { Cart } from '../entities/cart.entiti.js'
import { Carts } from '../models/cart.model.js'

export class CartManager {
  constructor () {
    this.path = './database/carts.json'
    this.carts = Carts
  }

  async createCart (data) {
    const newCart = await this.carts.create(data)
    return newCart
  }

  async getProductCartById (id) {
    const newCart = await this.carts.findOne({_id: id})
    return newCart
  }

  async addCart (id, idproduct) {
    const nCart = await this.carts.findOne({ _id: id })

    const productIndex = nCart.products.findIndex(prod => prod.product === idproduct)

    if (productIndex < 0) {
      nCart.products.push({ product: idproduct, quantity: 1 })
      await nCart.save()
      return nCart
    }
    nCart.products[productIndex].quantity++
    const newCart = await this.carts.findByIdAndUpdate(id, nCart)

    return nCart
  }
}
