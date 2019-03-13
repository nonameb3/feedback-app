import dotenv from 'dotenv'
dotenv.config()

// ==== app config ====
export const CLIENTID = process.env.CLIENTID
export const CLIENTSECRET = process.env.CLIENTSECRET
export const MONGODBURL = process.env.DBURL
export const COOKIEKEYS = process.env.COOKIEKEYS || 'cookieKeys'
