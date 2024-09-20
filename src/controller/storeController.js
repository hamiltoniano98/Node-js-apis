import { productSchemas } from '../schemas/productModel.js'
import { StoreValidateSchema } from '../schemas/validation.js'

export class storeController {
  static async get (req, res) {
    const getallProduct = await productSchemas.getall()
    res.json(getallProduct)
  }

  static async post (req, res) {
    const result = StoreValidateSchema(req.body)

    if (result.error) {
      return res.status(400).json({ error: result.error.message })
    }
    const newProduc = await productSchemas.create({ input: result.data })

    res.status(201).json(newProduc)
  }

  static async getbyProdname (req, res) {
    const prodname = req.params
    const prod = await productSchemas.getbyCategory(prodname)
    res.status(200).json(prod)
  }
}
