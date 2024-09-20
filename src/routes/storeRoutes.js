import { Router } from 'express'
import { storeController } from '../controller/storeController.js'
import { authRequired } from '../middleware/validateToken.js'

export const storeRoutes = Router()

// :/product ruta

storeRoutes.get('/', authRequired, storeController.get)
storeRoutes.post('/', storeController.post)
storeRoutes.get('/:prodname', storeController.getbyProdname)
