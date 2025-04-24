import type { HasMany } from '@adonisjs/lucid/types/relations'
import { DateTime } from 'luxon'
import { compose } from '@adonisjs/core/helpers'
import { BaseModel, column, hasMany } from '@adonisjs/lucid/orm'
import { withAuthFinder } from '@adonisjs/auth/mixins/lucid'
import hash from '@adonisjs/core/services/hash'
import Token from './token.js'
import mail from '@adonisjs/mail/services/main'
import VerifyEmailNotification from '#mails/verify_email'

const AuthFinder = withAuthFinder(() => hash.use('scrypt'), {
  uids: ['username'],
  passwordColumnName: 'password',
})

export default class User extends compose(BaseModel, AuthFinder) {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare username: string

  @column()
  declare first_name: string

  @column()
  declare last_name: string

  @column()
  declare email: string

  @column({ serializeAs: null })
  declare password: string

  @column()
  declare is_email_verified: boolean

  @column()
  declare avatar_url: string

  @column()
  declare language: string

  @hasMany(() => Token)
  declare tokens: HasMany<typeof Token>

  @hasMany(() => Token, { onQuery: (query) => query.where('type', 'PASSWORD_RESET') })
  declare password_reset_tokens: HasMany<typeof Token>

  @hasMany(() => Token, { onQuery: (query) => query.where('type', 'VERIFY_EMAIL') })
  declare verify_email_token: HasMany<typeof Token>

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime | null

  public async sendVerifyEmailToken() {
    const token = await Token.generateVerifyEmailToken(this)
    await mail.sendLater(new VerifyEmailNotification(this, token))
  }
}
