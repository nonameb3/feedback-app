import passport from 'passport'
import googleStrategy from 'passport-google-oauth20'
import dotenv from 'dotenv'

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
    callbackURL: '/auth/google/callback'
    }, (accressToken, refrestToken, profile, done) => {
      console.log(accressToken)
    }
  )
)
