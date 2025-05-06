import vine from '@vinejs/vine'

export const mediasValidator = vine.compile(
  vine.object({
    page: vine.number().positive(),
    limit: vine.number().positive(),
  })
)

export const animesValidator = vine.compile(
  vine.object({
    page: vine.number().positive(),
    limit: vine.number().positive(),
    search: vine.string().nullable(),
    genres: vine.array(vine.string()).nullable(),
    sort: vine.array(vine.string()),
  })
)
