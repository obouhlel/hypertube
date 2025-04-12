import { HttpContext } from '@adonisjs/core/http'
import env from '#start/env'

export default class FortyTwoAuthController {
  async redirect({ response }: HttpContext) {
    response.redirect(env.get('FORTYTWO_REDIRECT_URL'))
  }

  async callback({}: HttpContext) {}
}
