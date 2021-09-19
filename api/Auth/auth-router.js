const router = require('express').Router()
const Auth = require('./auth-model')
const bcrypt = require('bcryptjs')
const buildToken = require('./token-builder')
const { checkCreateAccount, checkUsernameUnique } = require('../middleware/checkInput')
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
stripe.applePayDomains.create({
  domain_name: process.env.REACT_APP_API_URI
});

router.post('/register', checkCreateAccount, checkUsernameUnique, (req, res, next) => {
  let user = req.body
  const hash = bcrypt.hashSync(user.password, 8)
  user.password = hash
  Auth.Add(user)
    .then(data => {
      const token = buildToken(data[0])
      res.status(200).json({
        user_id: data.user_id,
        username: data.username,
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

router.put('/update', (req, res, next) => {
  router.update(req.body)
    .then(data => res.json(data))
    .catch(next)
})

router.post('/create-payment-intent', async (req, res) => {
  const { paymentMethodType, amount } = req.body;
  const params = {
    payment_method_types: [paymentMethodType],
    amount: amount,
    currency: 'usd',
  }
  if (paymentMethodType === 'acss_debit') {
    params.payment_method_options = {
      acss_debit: {
        mandate_options: {
          payment_schedule: 'sporadic',
          transaction_type: 'personal',
        },
      },
    }
  }
  try {
    const paymentIntent = await stripe.paymentIntents.create(params);
    res.send({
      clientSecret: paymentIntent.client_secret,
    });
  } catch (e) {
    return res.status(400).send({
      error: {
        message: e.message,
      },
    });
  }
});

module.exports = router;
