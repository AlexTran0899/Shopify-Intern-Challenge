module.exports = (req, res, next) => {
  const token = req.headers.authorization
  const jwt = require('jsonwebtoken');
  const {JWT_SECRET} = require('../Auth/secret')
  if(token) {
    jwt.verify(token, JWT_SECRET, (err, decoded)=>{
      if (err) {
        next({status: 401, message: "you're not authorize to do that"})
      } else {
        req.decodedJwt = decoded
        next()
      }
    })
  } else {
    next({status: 401, message: 'please login'})
  }
};
