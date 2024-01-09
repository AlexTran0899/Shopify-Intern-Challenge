
exports.seed = function (knex) {
  return knex('image').insert([
    {"user_id": 1, "url": "https://lawstufflab37.s3.amazonaws.com/19e2538a-93c2-496a-8010-9e70faeecdae", "image_title": "somerandompics", "price": 199 },
    {"user_id": 5, "url": "https://lawstufflab37.s3.amazonaws.com/2a695257-bd8a-4d4b-87c7-5ecafef80ce8", "image_title": "somerandompics", "price": 1000 },
    {"user_id": 2, "url": "https://lawstufflab37.s3.amazonaws.com/00e2aafe-b3c3-441d-8ef6-408d38eb668f", "image_title": "somerandompics", "price": 1199 },
    {"user_id": 3, "url": "https://lawstufflab37.s3.amazonaws.com/01c39b1f-e502-486e-a008-e3749e9a14db", "image_title": "somerandompics", "price": 1299 },
    {"user_id": 5, "url": "https://lawstufflab37.s3.amazonaws.com/961c09a1-04b0-43c6-b1a3-f5afb289586c", "image_title": "somerandompics", "price": 1000 },
    {"user_id": 5, "url": "https://lawstufflab37.s3.amazonaws.com/05646f5f-1d9a-43bf-ae20-b06459732d34", "image_title": "somerandompics", "price": 1000 },
    {"user_id": 5, "url": "https://lawstufflab37.s3.amazonaws.com/11598244-b59f-41f5-9ba1-37bd6395a68c", "image_title": "somerandompics", "price": 1000 },
  ]);
};