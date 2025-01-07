import vine from '@vinejs/vine'

export const payloadPlaylistValidator = vine.compile(
  vine.object({
    name: vine.string().trim(),
  })
)

export const payloadPlaylistSongValidator = vine.compile(
  vine.object({
    songId: vine.number().min(1),
  })
)
