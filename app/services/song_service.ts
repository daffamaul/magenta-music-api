import Song from '#models/song'
import db from '@adonisjs/lucid/services/db'
import moment from 'moment'

export class SongService {
  async add({ albumId, title, year, genre, performer, duration }: any) {
    const created_at = moment().format('YYYY-MM-DD HH:mm:ss')
    const updated_at = created_at
    const songId = await db.table('songs').returning('id').insert({
      album_id: albumId,
      title,
      year,
      genre,
      performer,
      duration,
      created_at,
      updated_at,
    })

    return songId[0]
  }

  async index({ title, performer }: any) {
    let song

    if (title || performer) {
      if (title) {
        song = await db.from('songs').whereILike('title', `%${title}%`)
      }

      if (performer) {
        song = await db.from('songs').whereILike('performer', `%${performer}%`)
      }

      return song
    }

    song = await Song.all()
    return song
  }

  async show({ id }: any) {
    const song = await Song.findOrFail(id)
    return song
  }

  async showByAlbumId({ id }: any) {
    // const song = await Song.findBy('album_id', id)
    const song = await db.from('songs').where('album_id', id)
    return song
  }

  async edit({ id }: any, { albumId, title, year, genre, performer, duration }: any) {
    const song = await Song.findOrFail(id)
    await song
      .merge({
        albumId,
        title,
        year,
        genre,
        performer,
        duration,
      })
      .save()
  }

  async delete({ id }: any) {
    const song = await Song.findOrFail(id)
    await song.delete()
  }
}
