const db = require('../data/db-config')


function Add(data) { // done for you
    return db('image').insert(data, ['*'])
}
function update(data) { // done for you
    return db('image').where({image_id: data.image_id}).update(data, ['*'])
}

module.exports = {
    Add,
    update
}
