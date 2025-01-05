import vine from '@vinejs/vine'

export const payloadSongValidator = vine.compile(
  vine.object({
    title: vine.string().minLength(10),
    year: vine.number().min(1900).max(2025),
    performer: vine.string().minLength(5),
    genre: vine.string().minLength(5),
    duration: vine.number().min(2),
  })
)
