import { Exception } from '@adonisjs/core/exceptions'
import { HttpContext } from '@adonisjs/core/http'

export default class InvariantException extends Exception {
  static status = 400
  static code = 'E_INVARIANT'

  async handle(error: this, ctx: HttpContext) {
    ctx.response.status(error.status).send({
      status: 'fail',
      message: error.message,
    })
  }
}
