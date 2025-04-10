/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

import router from '@adonisjs/core/services/router'
import { middleware } from './kernel.js'

router.on('/').renderInertia('home')

router
  .group(() => {
    router.on('/login').renderInertia('login')
    router.on('/register').renderInertia('register')
  })
  .use(middleware.guest())

const AuthController = () => import('#controllers/auth_controller')
router
  .group(() => {
    router.post('register', [AuthController, 'register'])
    router.post('login', [AuthController, 'login'])
    router.post('logout', [AuthController, 'logout']).use(middleware.auth())
  })
  .prefix('auth')

router.group(() => {}).use(middleware.auth())
