import vine from '@vinejs/vine'

export const paginationValidator = vine.compile(
  vine.object({
    page: vine.number().positive(),
    limit: vine.number().positive(),
  })
)
