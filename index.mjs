import express from 'express'
import mongoose from 'mongoose'
import cookieSession from 'cookie-session'
import passport from 'passport'
import authRoutes from './routes/authRoutes'
import { MONGODBURL, COOKIEKEYS } from './services_config'
// run models
import './models/User'
import './services/passport'

console.log(MONGODBURL)
mongoose.connect(MONGODBURL)
const app = express()

// ==== set cookie =====
app.use(cookieSession({
  maxAge: 30 * 24 * 60 * 60 * 1000,
  keys: [COOKIEKEYS]
}))
app.use(passport.initialize())
app.use(passport.session())

// ==== set route =====
app.use('/', authRoutes)

// ==== start server ====
const PORT = process.env.PORT || 5000
app.listen(PORT, () => {
  console.log('server start at port: 5000')
})
