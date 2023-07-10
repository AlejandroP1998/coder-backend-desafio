import { createTransport } from 'nodemailer'
import { EMAIL_CONFIG } from '../config/email.config.js'

class EmailService {
  #clienteNodemailer

  constructor(config) {
    this.#clienteNodemailer = createTransport(config)
  }

  async send(destinatario, mensaje) {
    const mailOptions = {
      from: 'testeo de un ecommerce',
      to: destinatario,
      subject: 'Mail de testeo',
      text: mensaje,
    }
    try {
      const info = await this.#clienteNodemailer.sendMail(mailOptions)
      console.log(info)
      return info
    } catch (error) {
      console.log(error)
      throw error
    }
  }
}

class EmailServiceMock {

  constructor(config) { }

  async send(destinatario, mensaje) {
    console.log(`${destinatario}:  ${mensaje}`)
    return { destinatario, mensaje }
  }
}

const emailServiceMock = new EmailServiceMock()
const emailServiceGmail = new EmailService(EMAIL_CONFIG)

export let emailService
if (process.env.NODE_ENV === 'production') {
  emailService = emailServiceGmail
} else {
  emailService = emailServiceMock
}