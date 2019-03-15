import mongoose from 'mongoose'

const googleUser = new mongoose.Schema({
  googleId: String,
  credits: {type: Number, default: 0}
})

mongoose.model('user', googleUser)
