const db = require('../data/db-config')


function getAll() {
    return db('image')
}
function Add(data) {
    return db('image').insert(data, ['*'])
}
function getMyImage(user_id) {
  return db('image').where({user_id})
}
function updateImage(user_id,data) {
  return db('image').where({user_id}).update(data, ['*'])
}

module.exports = {
  getAll,
  Add,
  getMyImage,
  updateImage
}
