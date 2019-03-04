import passport from 'passport'
import googleStrategy from 'passport-google-oauth20'
import dotenv from 'dotenv'
import mongoose from 'mongoose'

const User = mongoose.model('user')

passport.serializeUser((user, done) => {
  done(null, user.id)
})

passport.deserializeUser((id, done) => {
  User.findById(id)
   .then(user => done(null, user))
})

//=======================
//    PASSPORT CONFIG
//=======================

dotenv.config()
const GoogleStategy = googleStrategy.Strategy
const clientId = process.env.CLIENTID
const clientSecret = process.env.CLIENTSECRET

passport.use(
  new GoogleStategy({
    clientID: clientId,
    clientSecret,
    callbackURL: '/auth/google/callback',
    proxy: true
    }, (accressToken, refrestToken, profile, done) => {
      User.findOne({ googleId: profile.id })
        .then(existingUser => {
          if(existingUser){
            // allready record this user
            done(null, existingUser)
          } else{
            // frist login for this user
            new User({ googleId: profile.id })
              .save()
              .then(user => done(null, user))
          }
        })
    }
  )
)
