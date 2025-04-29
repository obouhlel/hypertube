import vine from '@vinejs/vine'

export const avatarValidator = vine.compile(
  vine.object({
    avatar: vine.file({ size: 1024 * 1024, extnames: ['jpg', 'png', 'jpeg', 'webp'] }),
  })
)
