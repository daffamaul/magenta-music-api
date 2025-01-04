import InvariantException from '#exceptions/invariant_exception'
import User from '#models/user'

export class UserService {
  async add({ email, password, fullname: fullName }: any): Promise<void> {
    await User.create({
      email,
      password,
      fullName,
    })
  }

  async verifyEmail({ email }: any): Promise<void> {
    const user = await User.findByOrFail('email', email)

    if (user.$attributes.email) {
      throw new InvariantException('User unsuccessful added. Email has been already used')
    }
  }
}
