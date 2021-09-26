const router = require('express').Router()
const Auth = require('./auth-model')
const Image = require('../Image/image-model')
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

router.get('/', (req, res) => {
      res.json("keep it up")
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
  const { paymentMethodType , image_key} = req.body;
  const {price} = await Image.getImageByKey(image_key)
  const params = {
    payment_method_types: [paymentMethodType],
    amount: price,
    currency: 'usd',
    description: image_key
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

router.get('/confirm/:id', async (req, res) => {
  const intent = await stripe.paymentIntents.retrieve(req.params.id);
  const charges = intent.charges.data[0].status;
  const image_key = intent.charges.data[0].description
  if(charges === 'succeeded') {
    const image = await Image.getImageByKey(image_key)
    res.json(image)
  } else{
    res.status(400).json("not good")
  }
})

module.exports = router;
