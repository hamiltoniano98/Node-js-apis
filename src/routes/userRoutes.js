import { Router } from 'express'
import { userController } from '../controller/userController.js'
import { authRequired } from '../middleware/validateToken.js'

export const userRoutes = Router()

userRoutes.post('/register', userController.register)
userRoutes.post('/log', userController.login)
userRoutes.get('/profile', authRequired, userController.profile)
userRoutes.get('/logout', userController.logout)
