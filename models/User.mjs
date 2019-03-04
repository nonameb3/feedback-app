import mongoose from 'mongoose'

const googleUser = new mongoose.Schema({
  googleId: String
})

mongoose.model('user', googleUser)
