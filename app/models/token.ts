import type { BelongsTo } from '@adonisjs/lucid/types/relations'
import { BaseModel, belongsTo, column } from '@adonisjs/lucid/orm'
import { DateTime } from 'luxon'
import hash from '@adonisjs/core/services/hash'
import string from '@adonisjs/core/helpers/string'
import User from './user.js'

type TokenType = 'PASSWORD_RESET' | 'VERIFY_EMAIL' | 'DISCORD' | 'FORTYTWO' | 'GITHUB' | 'GOOGLE'
type RelationName = 'passwordResetTokens' | 'verifyEmailToken'

export default class Token extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare userId: number

  @column()
  declare type: string

  @column()
  declare token: string

  @column()
  declare expiresAt: DateTime | null

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime

  @belongsTo(() => User)
  declare user: BelongsTo<typeof User>

  public static async generateVerifyEmailToken(user: User) {
    const plainToken = string.generateRandom(64)

    await Token.expireTokens(user, 'verifyEmailToken')
    const token = await hash.make(plainToken)
    await user.related('passwordResetTokens').create({
      type: 'VERIFY_EMAIL',
      token,
      expiresAt: DateTime.now().plus({ hours: 24 }),
    })
    return plainToken
  }

  public static async generatePasswordResetToken(user: User) {
    const plainToken = string.generateRandom(64)

    await Token.expireTokens(user, 'passwordResetTokens')
    const token = await hash.make(plainToken)
    await user.related('passwordResetTokens').create({
      type: 'PASSWORD_RESET',
      token,
      expiresAt: DateTime.now().plus({ hours: 1 }),
    })
    return plainToken
  }

  public static async expireTokens(user: User, relation: RelationName) {
    const token = await user.related(relation).query().where('type', 'PASSWORD_RESET').first()
    if (token) {
      token.expiresAt = DateTime.now()
      await token.save()
    }
  }

  public static async getTokenUser(token: string, type: TokenType) {
    const tokens = await Token.query()
      .preload('user')
      .where('type', type)
      .where('expiresAt', '>', DateTime.now().toSQL())
      .orderBy('createdAt', 'desc')

    for (const record of tokens) {
      const isValid = await hash.verify(record.token, token)
      if (isValid) {
        return record.user
      }
    }

    return null
  }

  public static async verify(token: string, type: TokenType) {
    const tokens = await Token.query()
      .where('type', type)
      .where('expiresAt', '>', DateTime.now().toSQL())
      .orderBy('createdAt', 'desc')

    for (const record of tokens) {
      const isValid = await hash.verify(record.token, token)
      if (isValid) {
        return true
      }
    }

    return false
  }
}
