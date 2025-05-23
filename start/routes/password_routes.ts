import router from '@adonisjs/core/services/router'
import { middleware } from '#start/kernel'

const PasswordResetsController = () => import('#controllers/mail/password_resets_controller')
router
  .group(() => {
    router.get('/forgot-password', [PasswordResetsController, 'forgot']).as('forgot.show')
    router.post('/forgot-password', [PasswordResetsController, 'send']).as('send.token')
    router.get('/password-reset/:token', [PasswordResetsController, 'reset']).as('password.reset')
    router.post('/password-reset', [PasswordResetsController, 'store']).as('password.store')
  })
  .use(middleware.guest())
