import { createTransports } from "../../config";

class SendEmailNotification {
    async sendEmail(to, subject = "", html = "", from = "hackrajput@info.com") {
      console.log(approot)
    await createTransports.sendMail({
      from,
      to, 
      subject,
      html,
      
    },(error, info) => {
      if (error) {
        return  (error.message)
      } 
      console.log('Email sent: ' + info);
    })
  }
}


export default new SendEmailNotification