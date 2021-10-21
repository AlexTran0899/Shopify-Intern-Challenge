const router = require('express').Router()
const restricted = require('../middleware/restricted')
const image = require('./image-model')
const aws = require('aws-sdk');
aws.config.update({
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    region: 'us-east-1',
});

const s3 = new aws.S3({});

function deleteImage(data) {
    s3.deleteObject({
        Bucket: process.env.AWS_BUCKET,
        Key: data
        // eslint-disable-next-line no-unused-vars
    }, function (err, data) { })
}


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

router.put('/:image_key', restricted, (req, res, next) => {
    req.body.public = req.body.public === true ? 1 : 0
    req.body.price = parseInt(req.body.price * 100)
    image.updateImage(req.decodedJwt.subject, req.params.image_key, req.body)
        .then(data => res.json(data))
        .catch(next)
})
router.delete('/deleteOneImage/:image_key', restricted, (req, res, next) => {
    deleteImage(req.params.image_key)
    image.deleteOneImage(req.decodedJwt.subject, req.params.image_key)
        .then(() => res.json("image deleted"))
        .catch(next)
})
router.get('/find/:item_name', (req, res, next) => {
    image.find(req.params.item_name)
        .then(data => res.json(data))
        .catch(next)
})
router.get('/findMyImage/:item_name', restricted, (req, res, next) => {
    image.findMyImage(req.decodedJwt.subject, req.params.item_name)
        .then(data => res.json(data))
        .catch(next)
})

router.delete('/deleteAll', restricted, (req, res, next) => {
    image.deleteAllImage(req.decodedJwt.subject)
        .then(data => data.map(each => deleteImage(each.image_key)))
        .then(() => res.json("deleted all images"))
        .catch(next)
})

router.put('/views/:image_key', (req, res) => {
    image.incrementViews(req.params.image_key)
    .then(data => res.json(data))
})

module.exports = router;
