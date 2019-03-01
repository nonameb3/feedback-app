import passport from 'passport'
import express from 'express'

const router = express.Router()

//=======================
//    AUTH ROUTE
//=======================

router.get('/auth/google', passport.authenticate('google', {
  scope: ['profile', 'email']
}))

router.get('/auth/google/callback', passport.authenticate('google'))

//=======================

export default router
