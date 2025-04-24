import router from '@adonisjs/core/services/router'

const VerifyEmailController = () => import('#controllers/mail/verify_email_controller')
router.group(() => {
  router.get('/verify-email', [VerifyEmailController, 'index']).as('verify.email.index')
  router.get('/verify-email/:token', [VerifyEmailController, 'verify']).as('verify.email.verify')
})
