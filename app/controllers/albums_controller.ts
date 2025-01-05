import { AlbumService } from '#services/album_service'
import { payloadAlbumValidator } from '#validators/album'
import { inject } from '@adonisjs/core'
import type { HttpContext } from '@adonisjs/core/http'

@inject()
export default class AlbumsController {
  constructor(private albumService: AlbumService) {}

  /**
   * Show individual record
   */
  async show({ params }: HttpContext) {
    const album = await this.albumService.index(params)
    const { id, name, year } = album

    return {
      status: 'success',
      data: {
        album: {
          id,
          name,
          year,
        },
      },
    }
  }

  /**
   * Handle form submission for the create action
   */
  async store({ request, response }: HttpContext) {
    const payload = await request.validateUsing(payloadAlbumValidator)
    await this.albumService.add(payload)

    return response.status(201).send({
      status: 'success',
      message: 'Album successfully added',
    })
  }

  /**
   * Handle form submission for the edit action
   */
  async update({ params, request }: HttpContext) {
    const payload = await request.validateUsing(payloadAlbumValidator)
    await this.albumService.edit(params, payload)

    return {
      status: 'success',
      message: 'Album successfully updated',
    }
  }

  /**
   * Delete record
   */
  async destroy({ params }: HttpContext) {
    await this.albumService.delete(params)
    return {
      status: 'success',
      message: 'Album successfully deleted',
    }
  }
}
