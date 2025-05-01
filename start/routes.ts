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
import { middleware } from '#start/kernel'
import '#start/routes/auth_routes'
import '#start/routes/oauth_routes'
import '#start/routes/password_routes'
import '#start/routes/verify_account'
import '#start/routes/profil'
import '#start/routes/media'

router
  .get('/', (ctx: HttpContext) => ctx.inertia.render('home'))
  .use(middleware.silentAuth())
  .as('home')

// Toujours laisser tout en bas
router.get('*', (ctx: HttpContext) => ctx.inertia.render('errors/not_found')).as('not-found')
