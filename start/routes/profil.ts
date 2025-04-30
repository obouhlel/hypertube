import type { HttpContext } from '@adonisjs/core/http'
import router from '@adonisjs/core/services/router'
import { middleware } from '../kernel.js'

const UserProfilController = () => import('#controllers/profil/user_profil_controller')
const AvatarController = () => import('#controllers/profil/avatar_controller')
const EditPasswordController = () => import('#controllers/profil/edit_password_controller')
const ShowUserProfilController = () => import('#controllers/profil/show_user_profil_controller')
router
  .group(() => {
    router.get('/me', (ctx: HttpContext) => ctx.inertia.render('profil/me')).as('profil.me')

    router.get('/edit', [UserProfilController, 'show']).as('profil.edit')
    router.post('/update', [UserProfilController, 'update']).as('profil.update')

    router.get('/avatar', [AvatarController, 'show']).as('profil.avatar.show')
    router.post('/avatar', [AvatarController, 'store']).as('profil.avatar.store')

    router.get('/password', [EditPasswordController, 'show']).as('profil.edit.password')
    router.post('/password', [EditPasswordController, 'update']).as('profil.update.password')

    router.get('/:id', [ShowUserProfilController, 'show']).as('profil.show')
  })
  .prefix('profil')
  .use(middleware.auth())
