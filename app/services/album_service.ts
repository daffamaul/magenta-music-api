import Album from '#models/album'

export class AlbumService {
  async add({ name, year }: any) {
    await Album.create({
      name,
      year,
    })
  }

  async index({ id }: any) {
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
