import ValidationException from '#exceptions/validation_exception'
import Playlist from '#models/playlist'
import { errors as lucidErrors } from '@adonisjs/lucid'
import db from '@adonisjs/lucid/services/db'
import moment from 'moment'

export class PlaylistService {
  async add(name: string, owner: number) {
    const createdAt = moment().format('YYYY-MM-DD HH:mm:ss')
    const updatedAt = createdAt
    const playlist = await db.table('playlists').returning('id').insert({
      name,
      owner,
      updated_at: createdAt,
      created_at: updatedAt,
    })

    return playlist[0]
  }

  async index(owner: number) {
    const playlists = await db
      .from('playlists')
      .join('users', 'users.id', '=', 'playlists.owner')
      .select('playlists.id')
      .select('playlists.name')
      .select('users.full_name as fullname')
      .where('playlists.owner', owner)
    return playlists
  }

  async delete(id: string) {
    const playlist = await Playlist.findOrFail(id)
    playlist.delete()
  }

  async verifyOwner(owner: number, id: string) {
    const [playlist] = await db.from('playlists').where('id', id)
    console.log(playlist)
    if (!playlist) {
      throw new lucidErrors.E_ROW_NOT_FOUND()
    }

    if (playlist.owner !== owner) {
      throw new ValidationException('Do not have permission', { code: 'E_FORBIDDEN', status: 403 })
    }
  }
}
