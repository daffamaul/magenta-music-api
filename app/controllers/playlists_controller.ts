import { PlaylistService } from '#services/playlist_service'
import { PlaylistSongService } from '#services/playlist_song_service'
import { payloadPlaylistSongValidator, payloadPlaylistValidator } from '#validators/playlist'
import { inject } from '@adonisjs/core'
import type { HttpContext } from '@adonisjs/core/http'

@inject()
export default class PlaylistsController {
  constructor(
    private playlistService: PlaylistService,
    private playlistSongService: PlaylistSongService
  ) {}

  /**
   * Handle form submission for the create action
   */
  async store({ request, auth, response }: HttpContext) {
    const payload = await request.validateUsing(payloadPlaylistValidator)
    const { name } = payload
    const { id } = auth.getUserOrFail()
    const playlistId = await this.playlistService.add(name, id)

    return response.status(201).send({
      status: 'success',
      data: {
        playlistId,
      },
    })
  }

  /**
   * Display a list of resource
   */
  async index({ auth }: HttpContext) {
    const { id } = auth.getUserOrFail()
    const playlists = await this.playlistService.index(id)

    return {
      status: 'success',
      data: {
        playlists,
      },
    }
  }

  /**
   * Delete record
   */
  async destroy({ params, auth }: HttpContext) {
    const { id } = params
    const { id: owner } = auth.getUserOrFail()

    await this.playlistService.verifyOwner(owner, id)
    await this.playlistService.delete(id)

    return {
      status: 'success',
      message: 'Playlist successfully deleted',
    }
  }

  async addSongToPlaylist({ request, params, response, auth }: HttpContext) {
    const payload = await request.validateUsing(payloadPlaylistSongValidator)
    const { id } = params
    const { songId } = payload
    const { id: owner } = auth.getUserOrFail()

    await this.playlistService.verifyOwner(owner, id)
    await this.playlistSongService.add(songId, id)

    return response.status(201).send({
      status: 'success',
      message: 'Song successfully added to playlist',
    })
  }

  async getSongsInPlaylist({ auth, params }: HttpContext) {
    const { id } = params
    const { id: owner } = auth.getUserOrFail()

    await this.playlistService.verifyOwner(owner, id)
    const songInPlaylist = await this.playlistSongService.index(id)

    return {
      status: 'success',
      data: {
        playlist: songInPlaylist,
      },
    }
  }

  async deleteSongInPlaylist({ params, request, auth }: HttpContext) {
    const { songId } = await request.validateUsing(payloadPlaylistSongValidator)
    console.log(typeof songId)
    const { id } = params
    const { id: owner } = auth.getUserOrFail()

    await this.playlistService.verifyOwner(owner, id)
    await this.playlistSongService.delete(songId, id)

    return {
      status: 'success',
      message: 'Song in playlist successfully deleted',
    }
  }
}
