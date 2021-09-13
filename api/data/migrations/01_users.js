exports.up = async (knex) => {
  await knex.schema
    .createTable('users', (users) => {
      users.increments('user_id')
      users.string('username', 200).notNullable()
      users.string('password', 200).notNullable()
      users.string('email', 200).notNullable()
      users.string('img', 400)
      users.string('address',200)
      users.integer('zip',10)
      users.string('state',2)
      users.string('city',200)
      users.integer('phone',20)
      users.timestamps(false, true)
      users.string('first_name').notNullable()
      users.string('last_name').notNullable()
    })
}

exports.down = async (knex) => {
  await knex.schema.dropTableIfExists('users')
}
