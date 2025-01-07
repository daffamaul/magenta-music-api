import Album from '#models/album'
import db from '@adonisjs/lucid/services/db'
import moment from 'moment'

export class AlbumService {
  async add({ name, year }: any) {
    const createdAt = moment().format('YYYY-MM-DD HH:mm:ss')
    const updatedAt = createdAt
    const albumId = await db.table('albums').returning('id').insert({
      name,
      year,
      created_at: createdAt,
      updated_at: updatedAt,
    })

    return albumId[0]
  }

  async show({ id }: any) {
    const album = await Album.findOrFail(id)
    return album
  }

  async edit({ id }: any, { name, year }: any) {
    const album = await Album.findOrFail(id)
    await album
      .merge({
        name,
        year,
      })
      .save()
  }

  async delete({ id }: any) {
    const album = await Album.findOrFail(id)
    return album.delete()
  }
}
