import express from 'express'
import mongoose from 'mongoose'
import cookieSession from 'cookie-session'
import passport from 'passport'
import path from 'path'
import authRoutes from './routes/authRoutes'
import billingRoutes from './routes/billingRoutes'
import { MONGODBURL, COOKIEKEYS } from './services_config'
import bodyParser from 'body-parser'
// run models
import './models/User'
import './services/passport'

const app = express()
mongoose.connect(MONGODBURL, { useNewUrlParser: true })
const __dirname = path.dirname(new URL(import.meta.url).pathname);

// ==== set body-parser =====
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
// parse application/json
app.use(bodyParser.json())

// ==== set cookie =====
app.use(cookieSession({
  maxAge: 30 * 24 * 60 * 60 * 1000,
  keys: [COOKIEKEYS]
}))
app.use(passport.initialize())
app.use(passport.session())

// ==== set route =====
app.use('/', authRoutes)
app.use('/api', billingRoutes)

if(process.env.NODE_ENV === 'production') {
  app.use(express.static('client/build'))
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
  })
}

// ==== start server ====
const PORT = process.env.PORT || 5000
app.listen(PORT, () => {
  console.log('server start at port: 5000')
})
