const db = require('../data/db-config')

function getByUsername(username) {
    return db('users').where({ username }).first()
}

function getAll() {
    return db('users')
}

function findBy(filter) {
    return db('users').where(filter).first()
}

function Add(data) { // done for you
    return db('users').insert(data, ['*'])
}
function update(data) { // done for you
    return db('users').where({user_id: data.user_id}).update(data, ['*'])
}

module.exports = {
    Add,
    findBy,
    getAll,
    getByUsername,
    update
}
