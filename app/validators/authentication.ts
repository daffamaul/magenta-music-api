import vine from '@vinejs/vine'

export const payloadAuthValidator = vine.compile(
  vine.object({
    email: vine.string().email().trim(),
    password: vine.string().trim(),
  })
)

export const payloadTokenValidator = vine.compile(
  vine.object({
    refreshToken: vine.string().trim(),
  })
)
