const bcrypt = require('bcryptjs')
exports.seed = function (knex) {
  const hashed = (data) => bcrypt.hashSync(data, 8)
  return knex('users').insert([
    { password: hashed("123"), email: "roman@gmail.com" , img_url: 'https://picsum.photos/200/300', first_name: 'ben', last_name: 'dover'},
    { password: hashed("123"), email: "dylan@gmail.com" , first_name: 'dylan', last_name: 'rymizea'},
    { password: hashed("123"), email: "daniel@gmail.com" , img_url: 'https://picsum.photos/200/300', first_name: 'ben', last_name: 'dover'},
    { password: hashed("123"), email: "kyle@gmail.com" ,img_url: 'https://picsum.photos/200/300', first_name: 'daniel', last_name: 'kim'},
    { password: hashed("123"), email: "ben@gmail.com" , img_url: 'https://picsum.photos/200/300', first_name: 'kyle', last_name: 'lee'},
    { password: hashed("123"), email: "issac@gmail.com" , img_url: 'https://picsum.photos/200/300', first_name: 'issac', last_name: 'rob'},
    { password: hashed("123"), email: "francis@gmail.com" ,img_url: 'https://picsum.photos/200/300', first_name: 'francis', last_name: 'nguyen'},
    { password: hashed("123"), email: "krisda@gmail.com" , img_url: 'https://picsum.photos/200/300', first_name: 'krisda', last_name: 'dover'},
  ]);
};