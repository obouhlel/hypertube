import User from '#models/user'
import vine from '@vinejs/vine'

export const editProfilValidator = (user: User) => {
  return vine.compile(
    vine.object({
      username: vine
        .string()
        .alphaNumeric()
        .minLength(3)
        .maxLength(64)
        .unique(async (query, field) => {
          if (user.username === field) return true
          const existingUser = await query.from('users').where('username', field).first()
          return !existingUser
        }),
      last_name: vine.string().alpha().minLength(3),
      first_name: vine.string().alpha().minLength(3),
      email: vine
        .string()
        .email()
        .unique(async (query, field) => {
          if (user.email === field) return true
          const existingUser = await query.from('users').where('email', field).first()
          return !existingUser
        }),
      language: vine.string().in(['en', 'fr']),
    })
  )
}
