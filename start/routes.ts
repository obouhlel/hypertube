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

const MoviesController = () => import('#controllers/movies_controller')
router
  .group(() => {
    router.get('list', [MoviesController, 'show'])
  })
  .prefix('movies')
  .use(middleware.auth())

const AnimeController = () => import('#controllers/animes_controller')
router
  .group(() => {
    router.get('list', [AnimeController, 'show'])
  })
  .prefix('animes')
  .use(middleware.auth())

// Toujours laisser tout en bas
router.get('*', (ctx: HttpContext) => ctx.inertia.render('errors/not_found')).as('not-found')
