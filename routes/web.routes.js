import { Router, json } from 'express'
import { ProductManager } from '../manager/ProductManager.js'
const productMan = new ProductManager()
export const webRouter = Router()

webRouter.get('/', async (req, res) => {
  const products = await productMan.getProducts()

  res.render('home.handlebars', { listado1: products, titulo: 'Listado de productos' })
})

webRouter.get('/realtimeproducts', async (req, res) => {
  const products = await productMan.getProducts()
  res.render('realTimeProducts.handlebars', { listado: products, titulo: 'Agregar Productos' })
})

webRouter.get('/chat', async (req, res) => {
  const products = await productMan.getProducts()
  res.render('chat.handlebars', { listado: products, titulo: 'Chat' })
})
