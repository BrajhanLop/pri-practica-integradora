import { CartManager } from '../manager/CartManager.js'
import { ProductManager } from '../manager/ProductManager.js'
const newCart = new CartManager()
const productMan = new ProductManager()

export const createCart = async (req, res) => {
  await newCart.createCart({ products: [] })

  res.status(202).json({
    status: true,
    msg: 'success cart create'
  })
}

export const getCartById = async (req, res) => {
  const { cid } = req.params
  const cartn = await newCart.getProductCartById(cid)

  res.status(200).json({
    status: true,
    data: cartn
  })
}

export const addProductCart = async (req, res) => {
  const { cid, pid } = req.params
  const products = await productMan.getProductById(pid)
  if (!products) {
    return res.status(400).json({
      status: true,
      msg: 'products not found'
    })
  }

  const newAdd = await newCart.addCart(cid, pid)

  res.status(202).json({
    status: true,
    msg: newAdd
  })
}
