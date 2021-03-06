import dotenv from 'dotenv'
dotenv.config()

// ==== app config ====
// google auth api config
export const CLIENTID = process.env.GOOGLE_CLIENTID
export const CLIENTSECRET = process.env.GOOGLE_CLIENTSECRET
// mongodb config
export const MONGODBURL = process.env.MONGODB_URL
// cookiekeys config
export const COOKIEKEYS = process.env.COOKIE_KEYS || 'cookieKeys'
// stripe Publishable key
export const STRIPEPUBLICKEY = process.env.STRIPE_PUBLIC_KEY
export const STRIPESECRETKEY = process.env.STRIPE_SECRET_KEY
// send grid key
export const SENDGRIDKEY = process.env.SEND_GRID_KEY
// main client port
export const REDIRECT = process.env.REDIRECT_DOMAIN

// SSH
// $ ssh -R yourRandomSubdomain:80:localhost:5000 serveo.net
