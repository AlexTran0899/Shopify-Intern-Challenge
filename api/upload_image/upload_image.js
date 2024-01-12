const express = require('express');
const router = express.Router();
const upload = require('./fileupload');
const singleUpload = upload.single('image');
const Upload = require('./upload_image-model')
const restricted = require('../middleware/restricted')
const axios = require('axios')

async function imageLabeling(url) {
  let data = null
  let word = []
  const requests =
  {
    "requests": [{
      "image": { "source": { "imageUri": url } },
      "features": [
        {
          "type": "LABEL_DETECTION",
          "maxResults": 10
        }
      ]
    }
    ]
  }

  axios.post(`https://vision.googleapis.com/v1/images:annotate?key=${process.env.GOOGLE_API_KEY}`, requests)
    .then(res => data = res.data.responses[0])
    .then(() => data.labelAnnotations.map(each => word.push(each.description)))
    .then(() => word = word.join())
    .then(() => Upload.addingTags(url, word))
}

router.post('/', restricted, (req, res) => {
  singleUpload(req, res, async (err) => {
    if (!err) {
      const data = {
        image_key: req.file.key,
        user_id: req.decodedJwt.subject,
        image_title: '',
        url: req.file.location,
      }
      Upload.Add(data)
        .then(() => res.json({ image_key: req?.file?.key }))
        // .then(() => imageLabeling(req.file.location))
    } else {
      res.status(400).json(err)
    }
  })
});

router.put('/original_image/:image_key', restricted, (req, res) => {
  const image_key = req.params.image_key
  const user_id =   req.decodedJwt.subject
  singleUpload(req, res, (err) => {
    if (!err) {
      Upload.updateOriginalImage( user_id ,image_key, req.file.location)
        .then(data => res.json(data))
          .catch(err => console.log(err))
    } else {
      res.status(400).send({message: err})
    }
  })
});

module.exports = router;