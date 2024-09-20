import { json } from 'express'
import { MongoClient } from 'mongodb'
import { serverMDb } from '../config.js'

export const client = new MongoClient(serverMDb)
await client.connect()
const database = client.db('store1')
const product = database.collection('product')

export class productSchemas {
  static async create ({ input }) {
    await product.insertOne(input)
    return {
      ...input
    }
  }

  static async getall () {
    try {
      return product.find({}).toArray()
    } catch {
      const res = json({ message: 'Error' })
      return res
    }
  }

  static async getbyCategory ({ prodname }) {
    const query = {
      category: { $elemMatch: { $regex: prodname } }
    }
    const option = {
      sort: { price: -1 },
      projection: { _id: 0, productname: 1, price: 1 }
    }

    const cursor = product.find(query, option)
    let r = ''
    const y = []
    for await (const doc of cursor) {
      r = { ...doc }
      y.push(r)
    }
    return y
  }
}
