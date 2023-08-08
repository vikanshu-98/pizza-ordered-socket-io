import dotenv from 'dotenv'
dotenv.config()

export const {
    APP_PORT,
    APP_DEBUG,
    DB_URL,
    SESSION_SECRET_KEY,
    SMTP_EMAIL_HOST,
    SMTP_EMAIL_PORT,
    SMTP_EMAIL_USER_NAME,
    SMTP_EMAIL_PASSWORD, 
    APP_URL,
    FORGOT_PASSWORD_LINK_EXPIRY_TIME

}=process.env

export {default as initializePassport} from './passport/passportAuth'
export {default as  createTransports} from './mail/mailConfig'