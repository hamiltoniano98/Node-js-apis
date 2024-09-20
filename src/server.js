import app from './app.js'

const PORT = process.env.PORT ?? 1234

app.listen(PORT, () => {
  console.log('server port http://localhost:' + PORT)
})
