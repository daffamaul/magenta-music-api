import { Exception } from '@adonisjs/core/exceptions'
import { HttpContext } from '@adonisjs/core/http'

export default class ValidationException extends Exception {
  static status = 409
  static code = 'E_VALIDATION'

  async handle(error: this, ctx: HttpContext) {
    ctx.response.status(error.status).send({
      status: 'fail',
      message: error.message,
    })
  }

  async report(error: this, ctx: HttpContext) {
    ctx.logger.error({ err: error }, error.message)
  }
}
