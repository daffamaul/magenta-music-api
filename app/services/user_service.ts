import ValidationException from '#exceptions/validation_exception'
import User from '#models/user'
import hash from '@adonisjs/core/services/hash'
import db from '@adonisjs/lucid/services/db'
import moment from 'moment'

export class UserService {
  async add({ email, password, fullname: full_name }: any): Promise<void> {
    const created_at = moment().format('YYYY-MM-DD HH:mm:ss')
    const updated_at = created_at
    const hashedPassword = await hash.make(password)
    const userId = await db.table('users').returning('id').insert({
      email,
      password: hashedPassword,
      full_name,
      created_at,
      updated_at,
    })

    return userId[0]
  }

  async verifyEmail({ email }: any): Promise<void> {
    const user = await User.findBy('email', email)

    if (user?.$attributes.email) {
      throw new ValidationException('User unsuccessful added. Email has been already used', {
        code: 'E_EMAIL_ALREADY_IN_USE',
      })
    }
  }

  async verifyCredentials({ email, password }: any) {
    const user = await User.verifyCredentials(email, password)
    return user
  }
}
