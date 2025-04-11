import vine from '@vinejs/vine'

export const emailValidator = vine.compile(
  vine.object({
    email: vine.string().email(),
  })
)

export const newPasswordValidator = vine.compile(
  vine.object({
    new_password: vine.string().minLength(6).maxLength(512),
  })
)
