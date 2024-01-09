
exports.seed = function (knex) {
  return knex('image').insert([
    {"user_id": 1, "url": "https://lawstufflab37.s3.amazonaws.com/19e2538a-93c2-496a-8010-9e70faeecdae", "image_title": "somerandompics", "price": 199 },
    {"user_id": 2, "url": "https://lawstufflab37.s3.amazonaws.com/00e2aafe-b3c3-441d-8ef6-408d38eb668f", "image_title": "somerandompics", "price": 1199 },
    {"user_id": 3, "url": "https://lawstufflab37.s3.amazonaws.com/01c39b1f-e502-486e-a008-e3749e9a14db", "image_title": "somerandompics", "price": 1299 },
    {"user_id": 4, "url": "https://lawstufflab37.s3.amazonaws.com/02dd0475-05bb-4fa8-a41c-e5a60a605518", "image_title": "somerandompics", "price": 1099 },
    {"user_id": 5, "url": "https://lawstufflab37.s3.amazonaws.com/05646f5f-1d9a-43bf-ae20-b06459732d34", "image_title": "somerandompics", "price": 1000 },
  ]);
};