const router = require('express').Router()
const Auth = require('./auth-model')
const bcrypt = require('bcryptjs')
const buildToken = require('./token-builder')
const { checkCreateAccount, checkUsernameUnique } = require('../middleware/checkInput')

router.post('/register', checkCreateAccount, checkUsernameUnique, (req, res, next) => {
  let user = req.body
    console.log("here")
  user.email = user.email.toLowerCase()
  const hash = bcrypt.hashSync(user.password, 8)
  user.password = hash
  Auth.Add(user)
    .then(data => {
      const token = buildToken(data[0])
      res.status(200).json({
        user_id: data.user_id,
        email: data.email,
        token
      })
    })
    .catch(next)
});

router.post('/login', (req, res, next) => {
  req.body.email = req.body.email.toLowerCase()
  const { email, password } = req.body
  Auth.findBy({ email })
    .then(user => {
      if (user && bcrypt.compareSync(password, user.password)) {
        const token = buildToken(user)
        res.status(200).json({
          user_id: user.user_id,
          email: user.email,
          token
        })
      } else {
        next({
          status: 401,
          message: 'invalid credentials'
        })
      }
    })
    .catch(next)
});

// router.put('/update', (req, res, next) => {
//   router.update(req.body)
//     .then(data => res.json(data))
//     .catch(next)
// })

module.exports = router;
