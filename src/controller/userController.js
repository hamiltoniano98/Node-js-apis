import { skW } from '../config.js'
import { UserModel } from '../schemas/userModel.js'
import { UserValidateSchema } from '../schemas/validation.js'
import jwt from 'jsonwebtoken'

export class userController {
  static async register (req, res) {
    try {
      const result = UserValidateSchema(req.body)

      if (result.error) {
        return res.status(400).json({ error: result.error.message })
      }
      const user = await UserModel.create({ input: result.data })
      res.json(user)
    } catch (error) {
      res.json({ message: 'no connet' })
    }
  }

  static async login (req, res) {
    try {
      const result = UserValidateSchema(req.body)

      if (result.error) {
        return res.status(400).json({ error: result.error.message })
      }
      const user = await UserModel.login({ input: result.data })

      if (user.bad === 0) {
        jwt.sign(
          { id: user.id, username: user.username },
          skW,
          {
            expiresIn: '10s'
          },
          (err, token) => {
            if (err) {
              console.log(err)
            } else {
              res.cookie('access_token', token)
              res.json(user)
            }
          }
        )
      } else res.json(user.message)
    } catch (error) {
      res.json({ message: 'no connet' })
    }
  }

  static async profile (req, res) {
    res.send('welcome')
  }

  static async logout (req, res) {
    res.cookie('access_token', '')
    res.send('Adios')
  }
}
