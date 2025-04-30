import vine from '@vinejs/vine'

export const EditPassword = vine.compile(
  vine.object({
    username: vine.string().minLength(3),
    password: vine.string().minLength(6),
    new_password: vine.string().minLength(6),
  })
)
