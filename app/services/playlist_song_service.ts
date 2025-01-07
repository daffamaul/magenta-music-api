import { inject } from '@adonisjs/core'
import db from '@adonisjs/lucid/services/db'
import moment from 'moment'
import PlaylistSong from '#models/playlist_song'
import { SongService } from './song_service.js'
import { errors as lucidErrors } from '@adonisjs/lucid'

@inject()
export class PlaylistSongService {
  constructor(private songService: SongService) {}

  async add(song_id: number, playlist_id: string) {
    await this.songService.show(song_id)
    const createdAt = moment().format('YYYY-MM-DD HH:mm:ss')
    const updatedAt = createdAt
    const [playlistSongs] = await db.table('playlist_songs').returning('id').insert({
      song_id,
      created_at: createdAt,
      updated_at: updatedAt,
      playlist_id,
    })

    return playlistSongs
  }

  async index(playlist_id: string) {
    const songInPlaylist = await db
      .from('playlist_songs as ps')
      .join('songs', 'ps.song_id', '=', 'songs.id')
      .select('songs.id')
      .select('songs.title')
      .select('songs.performer')
      .where('ps.playlist_id', playlist_id)
    const [playlist] = await db
      .from('playlist_songs as ps')
      .join('playlists', 'ps.playlist_id', '=', 'playlists.id')
      .join('users', 'users.id', '=', 'playlists.owner')
      .select('playlists.id')
      .select('playlists.name')
      .select('users.full_name as fullname')
      .where('ps.playlist_id', playlist_id)

    return {
      ...playlist,
      songs: songInPlaylist,
    }
  }

  async delete(songId: number, playlistId: string) {
    const playlistSongId = await PlaylistSong.query()
      .where('song_id', songId)
      .andWhere('playlist_id', playlistId)
      .delete()
      .returning('id')

    if (!playlistSongId[0]) {
      throw new lucidErrors.E_ROW_NOT_FOUND()
    }
  }
}
