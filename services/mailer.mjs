import { mail } from 'sendgrid'
import { SENDGRIDKEY } from '../services_config'

export class mailer extends mail.Mail {
  constructor({subject, recipients}, content){
    super()

    this.from_email = new mail.Email('no-reply@email.com')
    this.subject = subject
    this.body = new mail.Content('text/html', content)
    this.recipients = this.formatAddresses(recipients)
  }
}

export default mailer
