import env from '#start/env'
import { defineConfig, services } from '@adonisjs/ally'
import { FortyTwoService } from '../forty-two/index.js'

const allyConfig = defineConfig({
  github: services.github({
    clientId: env.get('GITHUB_CLIENT_ID'),
    clientSecret: env.get('GITHUB_CLIENT_SECRET'),
    callbackUrl: env.get('GITHUB_CALLBACK_URL'),
  }),
  fortytwo: FortyTwoService({
    clientId: env.get('FORTYTWO_CLIENT_ID'),
    clientSecret: env.get('FORTYTWO_CLIENT_SECRET'),
    callbackUrl: env.get('FORTYTWO_CALLBACK_URL'),
  }),
})

export default allyConfig

declare module '@adonisjs/ally/types' {
  interface SocialProviders extends InferSocialProviders<typeof allyConfig> {}
}
