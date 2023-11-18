import cors from 'cors'
import express from 'express'
import mongoose from 'mongoose'
import * as dotenv from 'dotenv'
import itemModel from '../schemas/items'
import { RegisterRouter } from '../routes/register'
import { LoginRouter } from '../routes/login'
import { StripeRouter } from '../routes/stripe'
import path = require('path')

dotenv.config()

const PORT = process.env.PORT || 3000
const app = express()

app.use(express.json())
app.use(
  cors({
    origin: 'https://tailoredtails.onrender.com',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
    optionsSuccessStatus: 200,
  })
)

app.use(
  express.static(path.join(__dirname, 'tailored-tails-frontend', 'build'))
)

app.use('/register', RegisterRouter)
app.use('/login', LoginRouter)
app.use('/stripe', StripeRouter)

app.get('*', (req, res) => {
  res.sendFile(
    path.join(__dirname, 'tailored-tails-frontend', 'build', 'index.html')
  )
})

app.get('/items', async (req, res) => {
  const items = await itemModel.find()
  console.log(items)

  res.json(items)
})

app.get('/items/:itemId', async (req, res) => {
  try {
    const itemId = req.params.itemId
    const item = await itemModel.findById(itemId)
    console.log(item)
    res.json(item)
  } catch (err) {
    res.status(400).json(err)
  }
})

mongoose.connect(process.env.MONGO_URL!).then(() => {
  console.log(`listening to port ${PORT}`)
  app.listen(PORT)
})
