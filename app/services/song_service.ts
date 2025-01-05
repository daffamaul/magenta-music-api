import Song from '#models/song'
import db from '@adonisjs/lucid/services/db'

export class SongService {
  async add({ title, year, genre, performer, duration }: any) {
    await Song.create({
      title,
      year,
      genre,
      performer,
      duration,
    })
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

  async edit({ id }: any, { title, year, genre, performer, duration }: any) {
    const song = await Song.findOrFail(id)
    await song
      .merge({
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
