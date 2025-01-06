import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'songs'

  async up() {
    this.schema.alterTable(this.tableName, (table) => {
      table
        .integer('album_id')
        .after('id')
        .nullable()
        .unsigned()
        .references('id')
        .inTable('albums')
        .onDelete('CASCADE')
        .onUpdate('CASCADE')
    })
  }

  async down() {
    this.schema.alterTable(this.tableName, (table) => {
      table.dropForeign('album_id')
      table.dropColumn('album_id')
    })
  }
}
