import { middleware } from '#start/kernel'
import router from '@adonisjs/core/services/router'

const VerifyEmailController = () => import('#controllers/mail/verify_email_controller')
router
  .group(() => {
    router.get('/verify-email/:token', [VerifyEmailController, 'verify']).as('verify.email.verify')
    router.post('/resend-email', [VerifyEmailController, 'send']).as('verify.email.resend')
  })
  .use(middleware.auth())
