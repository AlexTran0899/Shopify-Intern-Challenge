const router = require('express').Router()
const image = require('./image-model')

router.get('/', (req, res, next) => {
    image.getAll()
        .then(data => res.json(data))
        .catch(next)
})

router.post('/', (req, res, next) => {
    image.Add(req.body)
        .then(data => res.json(data))
        .catch(next)
})

module.exports = router;
