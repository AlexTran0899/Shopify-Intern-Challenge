const db = require('../data/db-config')


function getAll() {
  return db('image').where({ public: 1 })
}
function Add(data) {
  return db('image').insert(data, ['*'])
}
function getMyImage(user_id) {
  return db('image').where({ user_id }).orderBy('image_id')
}
function updateImage(user_id, image_key, data) {
  return db('image').where({ user_id, image_key }).update(data, ['*'])
}

module.exports = {
  getAll,
  Add,
  getMyImage,
  updateImage
}
