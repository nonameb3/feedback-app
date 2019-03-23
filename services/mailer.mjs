import { mail } from 'sendgrid'
import { SENDGRIDKEY } from '../services_config'

export class mailer extends mail.Mail {
  constructor({subject, recipients}, content){
    super()

    this.from_email = new mail.Email('no-reply@email.com')
    this.subject = subject
    this.body = new mail.Content('text/html', content)
    this.recipients = this.formatAddresses(recipients)

    this.addContent(new mail.Content('text/html', content))
    this.addClickTracking()
    this.addRecipients()
  }

  formatAddresses(recipients) {
    return recipients.map(({email}) => new mail.Email(email))
  }

  addClickTracking() {
    const trackingSetting = new mail.TrackingSettings()
    const clickTracking = new mail.ClickTracking(true, true)

    trackingSetting.setClickTracking(clickTracking)
  }

  addRecipients() {
    const personalize = new mail.Personalization()

    this.recipients.map(recipient => {
      personalize.addTo(recipient)
    })
    this.addRecipients(personalize)
  }
}

export default mailer
