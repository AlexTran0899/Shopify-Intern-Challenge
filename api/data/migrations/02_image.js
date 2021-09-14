exports.up = async (knex) => {
    await knex.schema
      .createTable('image', (image) => {
        image.integer('image_id')
        image.string('image_key')
        image.integer('user_id')
        .references('user_id')
        .inTable('users')
        .onDelete('cascade')
        .onUpdate('cascade')
        .notNullable()
        image.string('image_title', 200).notNullable()
        image.string('url').notNullable()
        image.integer('views').defaultTo(1)
        image.integer('inventory').defaultTo(1)
        image.integer('price').defaultTo(1).notNullable()
      })
  }

  exports.down = async (knex) => {
    await knex.schema.dropTableIfExists('image')
  }
  