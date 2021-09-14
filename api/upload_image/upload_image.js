const express = require('express');
const router = express.Router();
const upload = require('./fileupload');
const singleUpload = upload.single('image');
const Upload = require('./upload_image-model')
router.post('/', async (req, res) => {
  singleUpload(req, res, () => {
    if (req?.file?.key) {
      const data = {
        image_key: req.file.key,
        user_id: 1,
        image_title: 'random panda',
        price: 2000,
        url: req.file.location
      }
      Upload.Add(data).then(()=> {
        return res.json({ imageURL: req?.file?.location });
      })
    } else {
      res.status(400).json('failed to upload');
    }
  });
});

module.exports = router;