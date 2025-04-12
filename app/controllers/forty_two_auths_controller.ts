import { HttpContext } from '@adonisjs/core/http'

export default class FortyTwoAuthController {
  async redirect({ ally }: HttpContext) {
    return ally.use('fortytwo').redirect()
  }

  async callback({ ally, inertia }: HttpContext) {
    const fortytwo = ally.use('fortytwo')

    if (fortytwo.accessDenied()) {
      return inertia.render('login', { errors: 'Access to GitHub was denied.' })
    }

    if (fortytwo.stateMisMatch()) {
      return inertia.render('login', { errors: 'State mismatch detected. Please try again.' })
    }

    if (fortytwo.hasError()) {
      return inertia.render('login', {
        errors: 'An unknown error occurred during GitHub authentication.',
      })
    }

    const fortytwoUser = await fortytwo.user()

    console.log(fortytwoUser)

    return inertia.render('home', {
      message:
        'Your account created, a random password set, if you want change please use forgot password',
    })
  }
}
