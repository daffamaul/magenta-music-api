import { AuthenticationService } from '#services/authentication_service'
import { UserService } from '#services/user_service'
import { payloadAuthValidator, payloadTokenValidator } from '#validators/authentication'
import { inject } from '@adonisjs/core'
import type { HttpContext } from '@adonisjs/core/http'

@inject()
export default class AuthenticationController {
  constructor(
    private userService: UserService,
    private authService: AuthenticationService
  ) {}
  /**
   * Handle form submission for the create action
   */
  async store({ request, auth, response }: HttpContext) {
    const payload = await request.validateUsing(payloadAuthValidator)
    const user = await this.userService.verifyCredentials(payload)
    const { token: accessToken } = await auth.use('jwt').generate(user)
    const { token: refreshToken } = await auth.use('jwt').generate(user, 'refresh')

    await this.authService.addRefreshToken(refreshToken)

    return response.status(201).send({
      status: 'success',
      message: 'Authentication successfully granted',
      data: {
        accessToken,
        refreshToken,
      },
    })
  }

  /**
   * Handle form submission for the edit action
   */
  async update({ request, auth }: HttpContext) {
    const payload = await request.validateUsing(payloadTokenValidator)
    const { refreshToken } = payload
    await this.authService.verifyRefreshToken(refreshToken)
    const user = await auth.use('jwt').verifyToken(refreshToken)
    const { token: accessToken } = await auth.use('jwt').generate(user)

    return {
      status: 'success',
      message: 'Access token successfully updated',
      data: {
        accessToken,
      },
    }
  }

  /**
   * Delete record
   */
  async destroy({ request }: HttpContext) {
    const payload = await request.validateUsing(payloadTokenValidator)
    const { refreshToken } = payload
    await this.authService.deleteRefreshToken(refreshToken)

    return {
      status: 'success',
      message: 'Refresh token successfully deleted',
    }
  }
}
