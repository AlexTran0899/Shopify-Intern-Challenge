const db = require('../data/db-config')


function Add(data) { // done for you
    return db('image').insert(data, ['*'])
}
function update(data) { // done for you
    return db('image').where({ image_id: data.image_id }).update(data, ['*'])
}

function updateOriginalImage(user_id,image_key, location) {
    return db('image').where({ image_key }).andWhere({user_id}).update({original_image: location},['*'])
}

function addingTags(url, data) {
    return db('image').where({ url }).update({ tags: data }, ['*'])
}

module.exports = {
    Add,
    update,
    addingTags,
    updateOriginalImage
}
