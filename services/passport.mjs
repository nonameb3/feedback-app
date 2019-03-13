import passport from 'passport'
import googleStrategy from 'passport-google-oauth20'
import mongoose from 'mongoose'
import { CLIENTID, CLIENTSECRET } from '../services_config'

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

const GoogleStategy = googleStrategy.Strategy
const clientId = CLIENTID
const clientSecret = CLIENTSECRET

passport.use(
  new GoogleStategy({
    clientID: clientId,
    clientSecret,
    callbackURL: '/auth/google/callback',
    proxy: true
    }, 
    async (accressToken, refrestToken, profile, done) => {
      const existingUser = await User.findOne({ googleId: profile.id })
        
      if(existingUser){
        // allready record this user
        done(null, existingUser)
      } else{
        // frist login for this user
        const user = await new User({ googleId: profile.id }).save()
        done(null, user)
      }
    }
  )
)
