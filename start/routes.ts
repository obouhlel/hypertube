/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

import type { HttpContext } from '@adonisjs/core/http'
import router from '@adonisjs/core/services/router'
import { middleware } from './kernel.js'

router
  .get('/', (ctx: HttpContext) => ctx.inertia.render('home'))
  .use(middleware.silentAuth())
  .as('home')

const LoginController = () => import('#controllers/login_controller')
const RegisterController = () => import('#controllers/register_controller')
const LogoutController = () => import('#controllers/logout_controller')
router
  .group(() => {
    router.get('/login', [LoginController, 'show']).as('login.show').use(middleware.guest())
    router.post('/login', [LoginController, 'store']).as('login.store').use(middleware.guest())

    router
      .get('/register', [RegisterController, 'show'])
      .as('register.show')
      .use(middleware.guest())
    router
      .post('/register', [RegisterController, 'store'])
      .as('register.store')
      .use(middleware.guest())

    router.post('/logout', [LogoutController, 'store']).as('logout.store').use(middleware.auth())
  })
  .prefix('auth')

const GoogleAuthController = () => import('#controllers/google_auth_controller')
router
  .group(() => {
    router.get('/redirect', [GoogleAuthController, 'redirect']).as('google.redirect')
    router.get('/callback', [GoogleAuthController, 'callback']).as('google.callback')
  })
  .use(middleware.guest())
  .prefix('google')

const GithubAuthController = () => import('#controllers/github_auth_controller')
router
  .group(() => {
    router.get('/redirect', [GithubAuthController, 'redirect']).as('github.redirect')
    router.get('/callback', [GithubAuthController, 'callback']).as('github.callback')
  })
  .use(middleware.guest())
  .prefix('github')

const DiscordAuthController = () => import('#controllers/discord_auth_controller')
router
  .group(() => {
    router.get('/redirect', [DiscordAuthController, 'redirect']).as('discord.redirect')
    router.get('/callback', [DiscordAuthController, 'callback']).as('discord.callback')
  })
  .use(middleware.guest())
  .prefix('discord')

const FortyTwoAuthController = () => import('#controllers/forty_two_auth_controller')
router
  .group(() => {
    router.get('/redirect', [FortyTwoAuthController, 'redirect']).as('fortytwo.redirect')
    router.get('/callback', [FortyTwoAuthController, 'callback']).as('fortytwo.callback')
  })
  .use(middleware.guest())
  .prefix('fortytwo')

const PasswordResetsController = () => import('#controllers/password_resets_controller')
router
  .group(() => {
    router.get('/forgot-password', [PasswordResetsController, 'forgot']).as('forgot.show')
    router.post('/forgot-password', [PasswordResetsController, 'send']).as('send.token')
    router.get('/password-reset/:token', [PasswordResetsController, 'reset']).as('password.reset')
    router.post('/password-reset', [PasswordResetsController, 'store']).as('password.store')
  })
  .use(middleware.guest())
