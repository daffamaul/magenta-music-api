import vine from '@vinejs/vine'

export const createUserValidator = vine.compile(
  vine.object({
    fullname: vine.string().trim().minLength(10).optional(),
    email: vine.string().trim().email(),
    password: vine.string().trim().minLength(8),
  })
)
