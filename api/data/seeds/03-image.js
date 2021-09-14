
exports.seed = function (knex) {
  return knex('image').insert([
    {"user_id": 1, "url": "https://picsum.photos/200/300/?blur", "image_title": "somerandompics", "price": "10.99" },
    {"user_id": 2, "url": "https://picsum.photos/200/300/?blur", "image_title": "somerandompics", "price": "11.99" },
    {"user_id": 3, "url": "https://picsum.photos/200/300/?blur", "image_title": "somerandompics", "price": "10.00" },
    {"user_id": 4, "url": "https://picsum.photos/200/300/?blur", "image_title": "somerandompics", "price": "10.00" },
    {"user_id": 5, "url": "https://picsum.photos/200/300/?blur", "image_title": "somerandompics", "price": "10.00" },
  ]);
};