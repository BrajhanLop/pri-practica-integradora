import { Schema, model } from 'mongoose'

const ProductSchema = Schema({
  title: {
    type: String,
    require: true
  },
  description: {
    type: String,
    require: true
  },
  code: {
    type: String,
    require: true
  },
  price: {
    type: String,
    require: true
  },
  status: {
    type: String,
    require: true,
    default: 'true'
  },
  category: {
    type: String,
    require: true
  },
  thumbnails: {
    type: String,
    require: true
  }
})

export const Products = model('product', ProductSchema)
