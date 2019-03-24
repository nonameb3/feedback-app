import sendgrid from 'sendgrid'
import { SENDGRIDKEY } from '../services_config'
const helper = sendgrid.mail

class Mailer extends helper.Mail {
  constructor({ subject, recipients }, content) {
    super()

    this.sgApi = sendgrid(SENDGRIDKEY)
    this.from_email = new helper.Email('no-reply@gmail.com')
    this.subject = subject
    this.body = new helper.Content('text/html', content)
    this.recipients = this.formatAddresses(recipients)
    this.addContent(this.body)
    this.addClickTracking()
    this.addRecipients()
  }

  formatAddresses(recipients) {
    let result = []
    recipients.forEach(({ email }) => {
      const mail = new helper.Email(email);
      result =[...result, mail]
    });
    return result
  }

  addClickTracking() {
    const trackingSettings = new helper.TrackingSettings()
    const clickTracking = new helper.ClickTracking(true, true)

    trackingSettings.setClickTracking(clickTracking)
    this.addTrackingSettings(trackingSettings)
  }

  addRecipients() {
    const personalize = new helper.Personalization();

    this.recipients.forEach(recipient => {
      personalize.addTo(recipient)
    });
    this.addPersonalization(personalize)
  }

  async send() {
    try {
      const request = this.sgApi.emptyRequest({
        method: 'POST',
        path: '/v3/mail/send',
        body: this.toJSON()
      });

      const response = await this.sgApi.API(request);
      return response
    } catch (error) {
      console.log(error.response.body)
    }
  }
}

export default Mailer

