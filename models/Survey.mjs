import mongoose from 'mongoose'
import recipientSchema from './Recipient'

const surveySchema = mongoose.Schema({
  title: String,
  body: String,
  subject: String,
  yes: { type: Number, default: 0 },
  no: { type: Number, default: 0 },
  _user: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
  dateSent: Date,
  lastResponse: Date,
  recipients: [recipientSchema]
})

mongoose.model('survey', surveySchema)
