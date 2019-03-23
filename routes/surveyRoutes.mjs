import express from 'express'
import { isLoggedIn, requireCredits } from '../middleware'
import mongoose from 'mongoose'
import Mailer from '../services/mailer'
import EmailTemplate from '../services/emailTemplates'

const router = express.Router()
const Survey = mongoose.model('survey') 

//=======================
//    SURVEY ROUTE
//=======================

router.post('/', isLoggedIn, requireCredits, (req, res) => {
  const {title, body, subject, recipients} = req.body
  const survey = new Survey({
    title,
    body,
    subject,
    recipients: recipients.split(',').map(email=>{return{eamil: email.trim()}}),
    _user: req.user.id,
    dateSent: Date.now()
  })

  const mailer = new Mailer(survey, EmailTemplate(survey))
  mailer.send()
})

// router.post('/', (req, res) => {
//   res.send('hello')
// })

//=======================

export default router