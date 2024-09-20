import express, { json } from 'express'
import { storeRoutes } from './routes/storeRoutes.js'
import { userRoutes } from './routes/userRoutes.js'
import cookie from 'cookie-parser'
import cors from 'cors'
const app = express()

app.use(cors())
app.use(json())
app.use(cookie())

app.disable('x-powered-by')

app.use('/product', storeRoutes)
app.use('/', userRoutes)

export default app
