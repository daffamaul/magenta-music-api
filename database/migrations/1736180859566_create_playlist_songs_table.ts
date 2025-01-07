import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'playlist_songs'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table
        .integer('playlist_id')
        .notNullable()
        .unsigned()
        .references('id')
        .inTable('playlists')
        .onDelete('CASCADE')
        .onUpdate('CASCADE')
      table
        .integer('song_id')
        .notNullable()
        .unsigned()
        .references('id')
        .inTable('songs')
        .onDelete('CASCADE')
        .onUpdate('CASCADE')
      table.timestamp('created_at')
      table.timestamp('updated_at')
    })
  }

  async down() {
    this.schema.alterTable(this.tableName, (table) => {
      table.dropForeign('playlist_id')
      table.dropColumn('playlist_id')
      table.dropForeign('song_id')
      table.dropColumn('song_id')
    })
    this.schema.dropTable(this.tableName)
  }
}
