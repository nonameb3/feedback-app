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

// req form website when create new Survey
router.post('/', isLoggedIn, requireCredits, async (req, res) => {
  const {title, body, subject, recipients} = req.body
  const survey = new Survey({
    title,
    body,
    subject,
   _user: req.user.id,
    dateSent: Date.now(),
    lastResponse: Date.now(),
    recipients: recipients.split(',').map(email=>{return{email: email.trim()}})
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

router.get('/:surveyId/:choice', (req, res) => {
  res.send('thx for voting!')
})

// req form sendgrid when user click email
router.post('/webhooks', (req, res) => {
  try {
    const p = Path.default.createPath('/api/surveys/:surveyId/:choice')

    _.chain(req.body)
    .map(({url, email}) => {
      const match = p.test(new URL(url).pathname)
      return {
        email,
        surveyId: match.surveyId,
        choice: match.choice
      }
    })
    .compact()
    .uniqBy('email', 'surveyId')
    .each(({surveyId, email, choice}) => {
      Survey.updateOne({
        _id: surveyId,
        recipients : {
          $elemMatch: { email: email, response: false }
        }
      },{
        $inc: { [choice]: 1},
        $set: { 'recipients.$.response': true , lastResponse: Date.now()}
      }).exec()
    })
    .value()
  } catch (error) {
    console.log(error.message)
  }

  res.send({})
})

//=======================

export default router