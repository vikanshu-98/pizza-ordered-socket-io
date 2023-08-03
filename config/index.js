import dotenv from 'dotenv'
dotenv.config()

export const {
    APP_PORT,
    APP_DEBUG,
    DB_URL,SESSION_SECRET_KEY
}= process.env

export {default as initializePassport} from './passport/passportAuth'