import vine from '@vinejs/vine'

export const payloadAlbumValidator = vine.compile(
  vine.object({
    name: vine.string().trim().minLength(5),
    year: vine.number().min(1900).max(2025),
  })
)
