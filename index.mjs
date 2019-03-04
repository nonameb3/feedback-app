import express from 'express'
import dotenv from 'dotenv'
import mongoose from 'mongoose'
import cookieSession from 'cookie-session'
import passport from 'passport'
import authRoutes from './routes/authRoutes'
// run models
import './models/User'
import './services/passport'

dotenv.config()
mongoose.connect(process.env.DBURL)
const app = express()

// set cookie
app.use(cookieSession({
  maxAge: 30 * 24 * 60 * 60 * 1000,
  keys: ['cookieKeys']
}))
app.use(passport.initialize())
app.use(passport.session())

// set route
app.use('/', authRoutes)

// start server config
const PORT = process.env.PORT || 5000
app.listen(PORT, () => {
  console.log('server start at port: 5000')
})
