import express from 'express'
import { isLoggedIn, requireCredits } from '../middleware'
import mongoose from 'mongoose'
import Mailer from '../services/mailer'
import EmailTemplate from '../services/emailTemplates'
import _ from 'lodash'
import Path from 'path-parser'
import { URL } from 'url'

const router = express.Router()
const Survey = mongoose.model('survey') 

//=======================
//    SURVEY ROUTE
//=======================

router.post('/',isLoggedIn, requireCredits, async (req, res) => {
  const {title, body, subject, recipients} = req.body
  const survey = new Survey({
    title,
    body,
    subject,
    recipients: recipients.split(',').map(email=>{return{email: email.trim()}}),
   _user: req.user.id,
    dateSent: Date.now()
  })

  const mailer = new Mailer(survey, EmailTemplate(survey))
  try {
    await mailer.send()
    await survey.save()
    req.user.credits -= 1
    const user = await req.user.save()
    res.send(user)
  } catch (error) {
    res.status(422).send(error)
  }

  console.log('finish send email.')
})

router.get('/thanks', (req, res) => {
  res.send('thx for voting!')
})

router.post('/webhooks', (req, res) => {
  const p = Path.default.createPath('/api/surveys/:surveyId/:choice')

  const event = _.chain(req.body)
    .map(({url, email}) => {
      const match = p.test(new URL(url).pathname)
      console.log(match)
      return {
        email,
        surveyId: match.surveyId,
        choice: match.choice
      }
    })
    .compact()
    .uniqBy('email', 'surveyId')
    .value()
  
  console.log(event)

  res.send({})
})

//=======================

export default router