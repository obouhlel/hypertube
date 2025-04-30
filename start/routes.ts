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
import './routes/auth_routes.js'
import './routes/oauth_routes.js'
import './routes/password_routes.js'
import './routes/verify_account.js'
import './routes/profil.js'

router
  .get('/', (ctx: HttpContext) => ctx.inertia.render('home'))
  .use(middleware.silentAuth())
  .as('home')
