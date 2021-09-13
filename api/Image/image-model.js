const db = require('../data/db-config')


function getAll() {
    return db('image')
}
function Add(data) {
    return db('image').insert(data, ['*'])
}

module.exports = {
  getAll,
  Add
}
