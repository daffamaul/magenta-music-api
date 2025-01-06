import Album from '#models/album'
import db from '@adonisjs/lucid/services/db'
import moment from 'moment'

export class AlbumService {
  async add({ name, year }: any) {
    const created_at = moment().format('YYYY-MM-DD HH:mm:ss')
    const updated_at = created_at
    const albumId = await db.table('albums').returning('id').insert({
      name,
      year,
      created_at,
      updated_at,
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
