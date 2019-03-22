import mongoose from 'mongoose'

const recipientSchema = new mongoose.Schema({
  email: String,
  response: { type: Boolean, default: false }
})

export default recipientSchema
