import sendgrid from 'sendgrid'
import { SENDGRIDKEY } from '../services_config'

const { mail } = sendgrid

export class mailer extends mail.Mail {
  constructor({subject, recipients}, content){
    super()
    
    this.sgApi = sendgrid(SENDGRIDKEY)
    this.from_email = new mail.Email('no-reply@email.com')
    this.subject = subject
    this.body = new mail.Content('text/html', content)
    this.recipients = this.formatAddresses(recipients)

    this.addContent(this.body)
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

    this.recipients.forEach(recipient => {
      personalize.addTo(recipient)
    })
    this.addPersonalization(personalize)
  }

  async send() {
    try {
      const request = this.sgApi.emptyRequest({
        method: 'POST',
        path: '/v3/mail/send',
        body: this.toJSON()
      })
  
      const response = await this.sgApi.API(request)
      return response
    } catch (error) {
      console.log('send error', error.message)
    }
  }
}

export default mailer
