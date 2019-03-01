import express from 'express'
import './services/passport'
import authRoutes from './routes/authRoutes'

const app = express()

app.use('/', authRoutes)

const PORT = process.env.PORT || 5000
app.listen(PORT, () => {
  console.log('server start at port: 5000')
})
