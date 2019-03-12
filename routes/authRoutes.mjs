import passport from 'passport'
import express from 'express'

const router = express.Router()

//=======================
//    AUTH ROUTE
//=======================

router.get('/auth/google', passport.authenticate('google', {
  scope: ['profile', 'email']
}))

router.get('/auth/google/callback',
  passport.authenticate('google'), // complete the authenticate using the google strategy
  (err, req, res, next) => { // custom error handler to catch any errors, such as TokenError
    if (err.name === 'TokenError') {
     res.redirect('/auth/google') // redirect them back to the login page
    } else {
     // Handle other errors here
    }
  },
  (req, res) => { // On success, redirect back to '/'
    res.redirect('/surveys')
  }
);

router.get('/api/logout', (req, res) => {
  req.logOut()
  res.redirect('/')
})

router.get('/api/current_user', (req,res) => {
 res.send(req.user)
})

//=======================

export default router
