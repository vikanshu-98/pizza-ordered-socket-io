import { createTransports } from "../../config";

class SendEmailNotification {
    async sendEmail(to, subject = "", html = "", from = "hackrajput@info.com") {
    await createTransports.sendMail({
      from,
      to, 
      subject,
      html,
      
    },(error, info) => {
      if (error) {
        console.log(error.message)
      }
      return true
    })
  }
}


export default new SendEmailNotification