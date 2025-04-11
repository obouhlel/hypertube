import { DateTime } from 'luxon'
import { BaseModel, belongsTo, column } from '@adonisjs/lucid/orm'
import User from './user.js'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'
import string from '@adonisjs/core/helpers/string'

export default class Token extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare userId: number | null

  @column()
  declare type: string

  @column()
  declare token: string

  @column()
  declare expiresAt: DateTime

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime

  @belongsTo(() => User)
  declare user: BelongsTo<typeof User>

  public static async generatePasswordResetToken(user: User | null) {
    const token = string.generateRandom(64)

    if (!user) return token

    await Token.expirePasswordResetToken(user)
    const record = await user.related('passwordResetTokens').create({
      type: 'PASSWORD_RESET',
      token,
      expiresAt: DateTime.now().plus({ hours: 1 }),
    })
    return record.token
  }

  public static async expirePasswordResetToken(user: User) {
    const token = await user
      .related('passwordResetTokens')
      .query()
      .where('type', 'PASSWORD_RESET')
      .first()
    if (token) {
      token.expiresAt = DateTime.now()
      await token.save()
    }
  }

  public static async getPasswordResetUser(token: string) {
    const record = await Token.query()
      .preload('user')
      .where('token', token)
      .where('expires_at', '>', DateTime.now().toSQL())
      .orderBy('created_at', 'desc')
      .first()
    return record?.user
  }

  public static async verify(token: string) {
    const record = await Token.query()
      .where('expires_at', '>', DateTime.now().toSQL())
      .where('token', token)
      .first()
    return !!record
  }
}
