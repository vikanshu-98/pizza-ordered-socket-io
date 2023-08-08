import nodemailer from 'nodemailer'
import dotenv from 'dotenv'
dotenv.config()
const  createTransport= nodemailer.createTransport({
    host:process.env.SMTP_EMAIL_HOST,
    port: process.env.SMTP_EMAIL_PORT,
    service:'MailTrap',
    auth: {
      user: process.env.SMTP_EMAIL_USER_NAME,
      pass: process.env.SMTP_EMAIL_PASSWORD
    },
    // logger:true,
    // debug:true
})
 
export default createTransport