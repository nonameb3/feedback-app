import passport from 'passport'
import express from 'express'

const router = express.Router()

//=======================
//    AUTH ROUTE
//=======================

router.get('/auth/google', passport.authenticate('google', {
  scope: ['profile', 'email']
}))

router.get('/auth/google/callback', passport.authenticate('google'), (req, res) => {
  res.send('callback page')
})

router.get('/api/logout', (req, res) => {
  req.logOut()
  res.send(req.user)
})

router.get('/api/current_user', (req,res) => {
 res.send(req.user)
})

//=======================

export default router
