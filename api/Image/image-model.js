const db = require('../data/db-config')


function getAll() {
  return db('image').where({ public: 1 }).select('url','price','image_key','image_title')
}
function Add(data) {
  return db('image').insert(data, ['*'])
}
function getAllUserImage(user_id) {
  return db('image').where({ user_id }).orderBy('views')
}

function getImageByKey(image_key) {
  return db('image').where({ image_key }).select(['original_image', 'price']).first()
}
function updateImage(user_id, image_key, data) {
  return db('image').where({ user_id }).andWhere({image_key}).update(data, ['*'])
}

function deleteOneImage(user_id, image_key) {
  console.log("in the model", user_id,image_key)
  return db('image').where({ user_id }).andWhere({ image_key}).del()
}

async function find(char) {
  return db('image').where('image_title', 'ilike', `%${char}%`)
    .andWhere({ public: 1 })
    .orWhere('tags', 'ilike', `%${char}%`)
    .andWhere({ public: 1 })
    .select('url','price','image_key','image_title')
}
function findAdminImages(user_id, char) {
  return db('image').where('image_title', 'ilike', `%${char}%`)
    .andWhere({ user_id })
    .orWhere('tags', 'ilike', `%${char}%`)
    .andWhere({ user_id })
      .select('url','price','image_key','image_title','views')
}

async function incrementViews(image_key){
  const data = await db('image').where({image_key}).select('views').first()
  return db('image').where({image_key}).update({views: data.views + 1}, ['views'])
}

function deleteAllImage(user_id) {
  return db('image').where({ user_id }).del(['image_key'])
}

module.exports = {
  getAll,
  Add,
  getAllUserImage,
  updateImage,
  deleteOneImage,
  deleteAllImage,
  find,
  findAdminImages,
  getImageByKey,
  incrementViews
}
