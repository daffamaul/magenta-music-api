import AuthJwt from '#models/auth_jwt'
import db from '@adonisjs/lucid/services/db'

export class AuthenticationService {
  async addRefreshToken(token: string) {
    await AuthJwt.create({ token })
  }

  async verifyRefreshToken(token: any) {
    await AuthJwt.findByOrFail('token', token)
  }

  async deleteRefreshToken(token: string) {
    const refreshToken = await AuthJwt.findByOrFail('token', token)
    refreshToken.delete()
  }
}
