const router = require('express').Router()
const restricted = require('../middleware/restricted')
const image = require('./image-model')

router.get('/', (req, res, next) => {
    image.getAll()
        .then(data => res.json(data))
        .catch(next)
})
router.get('/Myimage', restricted, (req, res, next) => {
    image.getMyImage(req.decodedJwt.subject)
        .then(data => res.json(data))
        .catch(next)
})

router.post('/', (req, res, next) => {
    image.Add(req.body)
        .then(data => res.json(data))
        .catch(next)
})

router.put('/', restricted, (req, res, next) => {
    image.updateImage(req.decodedJwt.subject, req.body)
        .then(data => res.json(data))
        .catch(next)
})

module.exports = router;
