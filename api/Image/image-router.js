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

router.put('/:image_key', restricted, (req, res, next) => {
    req.body.public = req.body.public === true? 1 : 0
    image.updateImage(req.decodedJwt.subject, req.params.image_key ,req.body)
        .then(data => res.json(data))
        .catch(next)
})
router.delete('/:image_key', restricted, (req, res, next) => {
    image.deleteOneImage(req.decodedJwt.subject, req.params.image_key)
        .then(() => res.json("image deleted"))
        .catch(next)
})

module.exports = router;
