exports.up = async (knex) => {
    await knex.schema
      .createTable('image', (image) => {
            image.increments('image_id')
            image.string('image_key').notNullable()
            image.integer('user_id')
            .references('user_id')
            .inTable('users')
            .onDelete('cascade')
            .onUpdate('cascade')
            .notNullable()
            image.string('image_title', 255)
            image.string('url')
            image.integer('views').defaultTo(1)
            image.integer('inventory').defaultTo(1)
            image.integer('price').defaultTo(50)
            image.integer('public').defaultTo(0)
            image.string('tags')
            image.string('original_image')
            image.integer('compressed_width')
            image.integer('compressed_height')
      })
  }

  exports.down = async (knex) => {
    await knex.schema.dropTableIfExists('image')
  }
  