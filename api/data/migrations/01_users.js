exports.up = async (knex) => {
  await knex.schema
    .createTable('users', (users) => {
        users.increments('user_id')
        users.string('email', 255).notNullable()
        users.string('password', 255).notNullable()
        users.string('last_name')
        users.string('first_name')
        users.string('img_url', 255)
        users.string('address',255)
        users.integer('zip',10)
        users.string('state',2)
        users.string('city',255)
        users.integer('phone',20)
      users.timestamps(false, true)
    })
}

exports.down = async (knex) => {
  await knex.schema.dropTableIfExists('users')
}
