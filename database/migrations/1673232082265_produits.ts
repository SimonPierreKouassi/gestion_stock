import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'produits'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.string('name').notNullable()
      table.string('code').notNullable()
      table.integer('prix_entreprise').notNullable()
      table.integer('prix_particulier').notNullable()
      table.integer('quantite').notNullable()
      table.string('image')
      table.text('description')
      table.integer('statut').defaultTo(0)

      /**
       * Uses timestamptz for PostgreSQL and DATETIME2 for MSSQL
       */
      table.timestamp('created_at', { useTz: true })
      
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
