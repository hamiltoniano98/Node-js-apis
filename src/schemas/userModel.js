import { MongoClient } from 'mongodb'
import { serverMDb, Salt } from '../config.js'
import bcrpyt from 'bcrypt'

export const client = new MongoClient(serverMDb)
await client.connect()
const database = client.db('store')
const user = database.collection('users')

export class UserModel {
  static async create ({ input }) {
    const t = await user.findOne({ username: input.username })
    console.log(t)
    if (t) {
      return { message: 'usuario ya existe' }
    } else {
      const hashpass = await bcrpyt.hash(input.password, Salt)
      input.password = hashpass
      await user.insertOne(input)

      return { message: 'Usuario creado' }
    }
  }

  static async login ({ input }) {
    let use = { bad: 1 }
    const t = await user.findOne({ username: input.username })

    if (!t) {
      return { message: 'usuario no existe', ...use }
    }
    const isValid = await bcrpyt.compare(input.password, t.password)
    if (!isValid) {
      return { message: 'contraseña mal', ...use }
    }
    use = t
    use.bad = 0
    return { message: 'Bienvenidoo', ...use }
  }
}
