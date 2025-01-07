import { SongService } from '#services/song_service'
import { payloadSongValidator } from '#validators/song'
import { inject } from '@adonisjs/core'
import type { HttpContext } from '@adonisjs/core/http'

@inject()
export default class SongController {
  constructor(private songService: SongService) {}

  /**
   * Display a list of resource
   */
  async index({ request }: HttpContext) {
    const songs = await this.songService.index(request.qs())
    const formatResponse = songs?.map(({ id, title, performer }) => ({
      id,
      title,
      performer,
    }))

    return {
      status: 'success',
      data: {
        songs: formatResponse,
      },
    }
  }

  /**
   * Handle form submission for the create action
   */
  async store({ request, response }: HttpContext) {
    const payload = await request.validateUsing(payloadSongValidator)
    const songId = await this.songService.add(payload)

    return response.status(201).send({
      status: 'success',
      data: {
        songId,
      },
    })
  }

  /**
   * Show individual record
   */
  async show({ params }: HttpContext) {
    const { id } = params
    const song: any = await this.songService.show(id)

    return {
      status: 'success',
      data: {
        song,
      },
    }
  }

  /**
   * Handle form submission for the edit action
   */
  async update({ params, request }: HttpContext) {
    const payload = await request.validateUsing(payloadSongValidator)
    await this.songService.edit(params, payload)

    return {
      status: 'success',
      message: 'Song successfully updated',
    }
  }

  /**
   * Delete record
   */
  async destroy({ params }: HttpContext) {
    await this.songService.delete(params)

    return {
      status: 'success',
      message: 'Song successfully deleted',
    }
  }
}
