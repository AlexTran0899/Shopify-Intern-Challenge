const router = require('express').Router()
const Auth = require('./auth-model')
const bcrypt = require('bcryptjs')
const buildToken = require('./token-builder')
const { checkCreateAccount, checkUsernameUnique } = require('../middleware/checkInput')

router.post('/register', checkCreateAccount, checkUsernameUnique, (req, res, next) => {
  let user = req.body
  const hash = bcrypt.hashSync(user.password, 8)
  user.password = hash
  Auth.Add(user)
    .then(user => {
      const token = buildToken(user)
        res.status(200).json({
          user_id: user.user_id,
          username: user.username,
          token
        })
    })
    .catch(next)
});

router.get('/getall', (req, res) => {
  Auth.getAll()
    .then(data => {
      res.json(data)
    })
})

router.post('/login', (req, res, next) => {
  const { username, password } = req.body
  Auth.findBy({ username })
    .then(user => {
      if (user && bcrypt.compareSync(password, user.password)) {
        const token = buildToken(user)
        res.status(200).json({
          user_id: user.user_id,
          username: user.username,
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

router.put('/update',(req, res, next) => {
  router.update(req.body)
  .then(data => res.json(data))
  .catch(next)
})

module.exports = router;
