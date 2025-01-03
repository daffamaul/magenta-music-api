import InternalServerException from '#exceptions/internal_server_exception'
import User from '#models/user'

export class UserService {
  async add({ email, password, fullname }: any): Promise<void> {
    try {
      await User.create({
        email: email,
        password: password,
        fullName: fullname,
      })
    } catch (error) {
      throw new InternalServerException(`User unsuccessful added. ${error.message.split(' - ')[1]}`)
    }
  }
}
