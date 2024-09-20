/* eslint-disable camelcase */
import jwt from 'jsonwebtoken'
import { skW } from '../config.js'
export const authRequired = (req, res, next) => {
  const { access_token } = req.cookies
  console.log(access_token)
  if (access_token === 'undefined' || access_token === '') {
    return res.status(401).json({ message: 'No autorizado' })
  }

  try {
    jwt.verify(access_token, skW)
  } catch (error) {}

  next()
}
