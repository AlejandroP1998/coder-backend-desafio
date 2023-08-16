import { createTransport } from 'nodemailer'
import { EMAIL_CONFIG } from '../config/email.config.js'
import { winstonLogger as logger } from '../utils/logger.js'
class EmailService {
  #clienteNodemailer

  constructor(config) {
    this.#clienteNodemailer = createTransport(config)
  }

  async send(destinatario, mensaje) {
    const mailOptions = {
      from: '1998japb@gmail.com',
      to: destinatario,
      subject: 'Informacion',
      text: mensaje,
    }
    try {
      const info = await this.#clienteNodemailer.sendMail(mailOptions)
      logger.info('correo de bienvenida enviado')
      return info
    } catch (error) {
      //console.log(error)
      throw error
    }
  }

  async sendPasswordResetMail(destinatario,token){
    const enlace = `http://localhost:8080/api/account/password/reset/${token}`
    const mailOptions = {
      from: '1998japb@gmail.com',
      to: destinatario,
      subject: 'Restauración de contraseña',
      html: `
      <p>Haz clic en el siguiente enlace para restaurar tu contraseña:</p>
      <a href="${enlace}">${enlace}</a>
    `
    };
    try {
      const info = await this.#clienteNodemailer.sendMail(mailOptions)
      logger.info('correo de restauracion de contraseña enviado')
      return info
    } catch (error) {
      //console.log(error)
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