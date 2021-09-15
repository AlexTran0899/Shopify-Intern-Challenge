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
    console.log("here in the delete")
    s3.deleteObject({
        Bucket: process.env.AWS_BUCKET,
        Key: data
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

router.post('/', (req, res, next) => {
    image.Add(req.body)
        .then(data => res.json(data))
        .catch(next)
})

router.put('/:image_key', restricted, (req, res, next) => {
    req.body.public = req.body.public === true ? 1 : 0
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
router.delete('/deleteAll', restricted, (req, res, next) => {
    image.deleteAllImage(req.decodedJwt.subject)
        .then(data => data.map(each => deleteImage(each.image_key)))
        .then(()=> res.json("deleted all images"))
        .catch(next)
})

module.exports = router;
