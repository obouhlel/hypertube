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

router
  .get('/', (ctx: HttpContext) => ctx.inertia.render('home'))
  .use(middleware.silentAuth())
  .as('home')

const UserProfilController = () => import('#controllers/profil/user_profil_controller')
router
  .group(() => {
    router.get('/me', (ctx: HttpContext) => ctx.inertia.render('profil/me')).as('profil.me')
    router.get('/edit', (ctx: HttpContext) => ctx.inertia.render('profil/edit')).as('profil.edit')
    router.post('/update', [UserProfilController, 'update']).as('profil.update')
    router.get('/:id', [UserProfilController, 'show']).as('profil.show')
  })
  .prefix('profil')
  .use(middleware.auth())
