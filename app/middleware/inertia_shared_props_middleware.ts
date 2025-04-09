import type { HttpContext } from '@adonisjs/core/http'

export default class InertiaSharedProps {
  async handle(ctx: HttpContext, next: () => Promise<void>) {
    ctx.inertia.share({
      csrf_token: ctx.request.csrfToken,
    })
    await next()
  }
}
