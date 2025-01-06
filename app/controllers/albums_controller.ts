import { AlbumService } from '#services/album_service'
import { SongService } from '#services/song_service'
import { payloadAlbumValidator } from '#validators/album'
import { inject } from '@adonisjs/core'
import type { HttpContext } from '@adonisjs/core/http'

@inject()
export default class AlbumsController {
  constructor(
    private albumService: AlbumService,
    private songService: SongService
  ) {}

  /**
   * Show individual record
   */
  async show({ params }: HttpContext) {
    const album = await this.albumService.show(params)
    const songs = await this.songService.showByAlbumId(params)
    const songsFormatRespose = songs.map(({ id, title, performer }) => ({ id, title, performer }))
    const { id, name, year } = album

    return {
      status: 'success',
      data: {
        album: {
          id,
          name,
          year,
          songs: songsFormatRespose,
        },
      },
    }
  }

  /**
   * Handle form submission for the create action
   */
  async store({ request, response }: HttpContext) {
    const payload = await request.validateUsing(payloadAlbumValidator)
    const albumId = await this.albumService.add(payload)

    return response.status(201).send({
      status: 'success',
      data: {
        albumId,
      },
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
