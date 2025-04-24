import router from '@adonisjs/core/services/router'
import { middleware } from '#start/kernel'

const GoogleAuthController = () => import('#controllers/oauth/google_auth_controller')
const GithubAuthController = () => import('#controllers/oauth/github_auth_controller')
const DiscordAuthController = () => import('#controllers/oauth/discord_auth_controller')
const FortyTwoAuthController = () => import('#controllers/oauth/forty_two_auth_controller')

router
  .group(() => {
    router.get('/redirect', [GoogleAuthController, 'redirect']).as('google.redirect')
    router.get('/callback', [GoogleAuthController, 'callback']).as('google.callback')
  })
  .use(middleware.guest())
  .prefix('google')

router
  .group(() => {
    router.get('/redirect', [GithubAuthController, 'redirect']).as('github.redirect')
    router.get('/callback', [GithubAuthController, 'callback']).as('github.callback')
  })
  .use(middleware.guest())
  .prefix('github')

router
  .group(() => {
    router.get('/redirect', [DiscordAuthController, 'redirect']).as('discord.redirect')
    router.get('/callback', [DiscordAuthController, 'callback']).as('discord.callback')
  })
  .use(middleware.guest())
  .prefix('discord')

router
  .group(() => {
    router.get('/redirect', [FortyTwoAuthController, 'redirect']).as('fortytwo.redirect')
    router.get('/callback', [FortyTwoAuthController, 'callback']).as('fortytwo.callback')
  })
  .use(middleware.guest())
  .prefix('fortytwo')
