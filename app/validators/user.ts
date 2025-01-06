import vine from '@vinejs/vine'

export const createUserValidator = vine.compile(
  vine.object({
    fullname: vine.string().optional(),
    email: vine.string().trim().email(),
    password: vine.string().trim().minLength(8),
  })
)
