import express from 'express'
import _stripe from 'stripe'
import { STRIPESECRETKEY } from '../services_config'

const router = express.Router()
const stripe = _stripe(STRIPESECRETKEY)

//=======================
//    AUTH ROUTE
//=======================

router.post('/stripe', async (req, res) => {
  await stripe.charges.create({
    amount: 500,
    currency: 'usd',
    description: '5$ for 5 credit',
    source: req.body.id
  })

  req.user.credits += 5
  const user = await req.user.save()
  res.send(user)
})

//=======================

export default router