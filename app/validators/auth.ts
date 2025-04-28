import vine from '@vinejs/vine'

export const loginValidator = vine.compile(
  vine.object({
    username: vine.string().minLength(3).maxLength(64),
    password: vine.string().minLength(6).maxLength(512),
  })
)

export const registerValidator = vine.compile(
  vine.object({
    username: vine
      .string()
      .alphaNumeric()
      .minLength(3)
      .maxLength(64)
      .unique(async (query, field) => {
        const user = await query.from('users').where('username', field).first()
        return !user
      }),
    last_name: vine.string().alpha().minLength(3),
    first_name: vine.string().alpha().minLength(3),
    email: vine
      .string()
      .email()
      .unique(async (query, field) => {
        const user = await query.from('users').where('email', field).first()
        return !user
      }),
    password: vine.string().minLength(6).maxLength(512),
  })
)
