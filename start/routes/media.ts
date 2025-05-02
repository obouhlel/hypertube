import router from '@adonisjs/core/services/router'
import { middleware } from '#start/kernel'

const MoviesController = () => import('#controllers/movies_controller')
router
  .group(() => {
    router.get('list', [MoviesController, 'show'])
  })
  .prefix('movies')
  .use(middleware.auth())

const AnimesController = () => import('#controllers/animes_controller')
router
  .group(() => {
    router.get('list', [AnimesController, 'show'])
    router.post('pagination', [AnimesController, 'fetchPagination'])
  })
  .prefix('animes')
  .use(middleware.auth())
