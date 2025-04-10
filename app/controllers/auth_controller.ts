import type { HttpContext } from '@adonisjs/core/http'
import User from '#models/user'
import { registerValidator, loginValidator } from '#validators/auth'

export default class AuthController {
  async login({ request, session, inertia }: HttpContext) {
    const { email, password } = await request.validateUsing(loginValidator)

    const user = await User.verifyCredentials(email, password)
    const token = await User.accessTokens.create(user)

    // Stocker le token dans la session
    session.put('token', token)

    // Rediriger vers la page home avec Inertia
    return inertia.render('home', {
      user: user.serialize(),
    })
  }

  async register({ request, inertia }: HttpContext) {
    const payload = await request.validateUsing(registerValidator)

    await User.create(payload)

    // Rediriger vers la page login avec Inertia
    return inertia.render('login', {
      message: 'Account created successfully. Please log in.',
    })
  }

  async logout({ auth, response }: HttpContext) {
    const user = auth.getUserOrFail()
    const token = auth.user?.currentAccessToken.identifier
    if (!token) {
      return response.badRequest({ message: 'Token not found' })
    }
    await User.accessTokens.delete(user, token)
    return response.ok({ message: 'Logged out' })
  }
}
