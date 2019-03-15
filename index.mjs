import express from 'express'
import mongoose from 'mongoose'
import cookieSession from 'cookie-session'
import passport from 'passport'
import authRoutes from './routes/authRoutes'
import billingRoutes from './routes/billingRoutes'
import { MONGODBURL, COOKIEKEYS } from './services_config'
import bodyParser from 'body-parser'
// run models
import './models/User'
import './services/passport'

mongoose.connect(MONGODBURL, { useNewUrlParser: true })
const app = express()

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

// ==== start server ====
const PORT = process.env.PORT || 5000
app.listen(PORT, () => {
  console.log('server start at port: 5000')
})
