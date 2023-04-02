import { Schema, model } from 'mongoose'

const cartSquema = Schema({
  products: {
    type: [],
    require: true
  }
})

export const Carts = model('cart', cartSquema)
