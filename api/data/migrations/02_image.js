exports.up = async (knex) => {
    await knex.schema
      .createTable('image', (image) => {
        image.increments('image_id')
        image.string('image_key')
        image.integer('user_id')
        .references('user_id')
        .inTable('users')
        .onDelete('cascade')
        .onUpdate('cascade')
        .notNullable()
        image.string('image_title', 200)
        image.string('url')
        image.integer('views').defaultTo(1)
        image.integer('inventory').defaultTo(1)
        image.string('price').defaultTo("1")
      })
  }

  exports.down = async (knex) => {
    await knex.schema.dropTableIfExists('image')
  }
  