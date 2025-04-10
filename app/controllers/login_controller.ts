import type { HttpContext } from '@adonisjs/core/http'
import { loginValidator } from '#validators/auth'
import User from '#models/user'

export default class LoginController {
  async show({ inertia }: HttpContext) {
    return inertia.render('login')
  }

  async store({ request, response, auth, inertia }: HttpContext) {
    const { username, password } = await request.validateUsing(loginValidator)
    const userTmpResult = await User.query().where('username', username).first()
    if (!userTmpResult) {
      return inertia.render('login', {
        errors: {
          form: 'Bad username or password',
        },
      })
    }
    const userTmp = userTmpResult
    const user = await User.verifyCredentials(userTmp.email, password)
    await auth.use('web').login(user)
    return response.redirect('/')
  }
}
