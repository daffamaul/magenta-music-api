import { Exception } from '@adonisjs/core/exceptions'
import { HttpContext } from '@adonisjs/core/http'

export default class InternalServerException extends Exception {
  static status = 500
  static code = 'E_INTERNAL_SERVER'

  async handle(error: this, ctx: HttpContext) {
    ctx.response.status(error.status).send({
      status: 'fail',
      message: error.message,
    })
  }
}
