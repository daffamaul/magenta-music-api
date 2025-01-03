import { UserService } from '#services/user_service'
import { createUserValidator } from '#validators/user'
import { inject } from '@adonisjs/core'
import type { HttpContext } from '@adonisjs/core/http'

@inject()
export default class UsersController {
  constructor(private userService: UserService) {}

  async store({ request, response }: HttpContext) {
    const payload = await request.validateUsing(createUserValidator)
    await this.userService.add(payload)

    return response.status(201).send({
      status: 'success',
      message: 'User successfully added',
    })
  }
}
