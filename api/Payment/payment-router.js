const router = require('express').Router()
const Image = require('../Image/image-model')
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

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
  const charges = intent.status;
  const image_key = intent.description

  if(charges === 'succeeded') {
    const image = await Image.getImageByKey(image_key)
    res.json(image)
  } else{
    res.status(400).json("not good")
  }
})

router.get('/config', async (req, res) => {
  res.json({publishableKey:process.env.STRIPE_PUBLIC_KEY})
})

module.exports = router;
