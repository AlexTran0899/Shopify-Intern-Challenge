const bcrypt = require('bcryptjs')
exports.seed = function (knex) {
  const hashed = (data) => bcrypt.hashSync(data, 8)
  return knex('users').insert([
    { username: "roman", password: hashed("123"), email: "roman@gmail.com" , img: 'https://picsum.photos/200/300', first_name: 'ben', last_name: 'dover'},
    { username: "dylan", password: hashed("123"), email: "dylan@gmail.com" , first_name: 'dylan', last_name: 'rymizea'},
    { username: "daniel", password: hashed("123"), email: "daniel@gmail.com" , img: 'https://picsum.photos/200/300', first_name: 'ben', last_name: 'dover'},
    { username: "kyle", password: hashed("123"), email: "kyle@gmail.com" ,img: 'https://picsum.photos/200/300', first_name: 'daniel', last_name: 'kim'},
    { username: "ben", password: hashed("123"), email: "ben@gmail.com" , img: 'https://picsum.photos/200/300', first_name: 'kyle', last_name: 'lee'},
    { username: "issac", password: hashed("123"), email: "issac@gmail.com" , img: 'https://picsum.photos/200/300', first_name: 'issac', last_name: 'rob'},
    { username: "francis", password: hashed("123"), email: "francis@gmail.com" ,img: 'https://picsum.photos/200/300', first_name: 'francis', last_name: 'nguyen'},
    { username: "krisda", password: hashed("123"), email: "krisda@gmail.com" , img: 'https://picsum.photos/200/300', first_name: 'krisda', last_name: 'dover'},
  ]);
};