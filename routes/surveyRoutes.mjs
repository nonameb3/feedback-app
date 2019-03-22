import express from 'express'
import { isLoggedIn, requireCredits } from '../middleware'
import mongoose from 'mongoose';
import Mailer from '../services/mailer'
import EmailTemplate from '../services/emailTemplates'

const route = express.Router()
const Survey = mongoose.model('survey') 

//=======================
//    SURVEY ROUTE
//=======================

route.post('/', isLoggedIn, requireCredits, (req, res) => {
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
})

//=======================

export default router