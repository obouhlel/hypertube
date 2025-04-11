import type { HasMany } from '@adonisjs/lucid/types/relations'
import { DateTime } from 'luxon'
import { compose } from '@adonisjs/core/helpers'
import { BaseModel, column, hasMany } from '@adonisjs/lucid/orm'
import { withAuthFinder } from '@adonisjs/auth/mixins/lucid'
import hash from '@adonisjs/core/services/hash'
import Token from './token.js'

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
  declare avatar_url: string

  @column()
  declare language: string

  @hasMany(() => Token)
  declare tokens: HasMany<typeof Token>

  @hasMany(() => Token, { onQuery: (query) => query.where('type', 'PASSWORD_RESET') })
  declare passwordResetTokens: HasMany<typeof Token>

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime | null
}
