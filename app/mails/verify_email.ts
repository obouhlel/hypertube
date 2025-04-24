import User from '#models/user'
import { BaseMail } from '@adonisjs/mail'
import env from '#start/env'
import router from '@adonisjs/core/services/router'

export default class VerifyEmailNotification extends BaseMail {
  from = 'no-reply@obouhlel.xyz'
  subject = 'Verify your account Hypertube'

  constructor(
    private user: User,
    private token: string
  ) {
    super()
  }

  /**
   * The "prepare" method is called automatically when
   * the email is sent or queued.
   */
  prepare() {
    const domain = env.get('DOMAIN')
    const path = router.makeUrl('verify.email.verify', [this.token])
    const verificationLink = domain + path
    this.message.from(this.from).to(this.user.email).subject(this.subject).html(`
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e4e4e4; border-radius: 5px;">
        <div style="text-align: center; margin-bottom: 20px;">
          <h1 style="color: #333;">Verify Your Email Address</h1>
        </div>
        <div style="color: #555; line-height: 1.5;">
          <p>Hello ${this.user.username},</p>
          <p>Thank you for registering on Hypertube. Please verify your email address to complete your registration.</p>
          <div style="text-align: center; margin: 30px 0;">
            <a href="${verificationLink}" style="background-color: #0070f3; color: white; padding: 12px 24px; text-decoration: none; border-radius: 4px; font-weight: bold;">Verify Email</a>
          </div>
          <p>If the button doesn't work, copy and paste this link into your browser:</p>
          <p style="word-break: break-all; background-color: #f5f5f5; padding: 10px; border-radius: 4px;">${verificationLink}</p>
          <p>This link will expire in 24 hours for security reasons.</p>
          <p>Regards,<br>The Hypertube Team</p>
        </div>
      </div>
    `)
  }
}
