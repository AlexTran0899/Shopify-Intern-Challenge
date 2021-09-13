const express = require('express');
const router = express.Router();
const upload = require('./fileupload');
const singleUpload = upload.single('image');

router.post('/', async (req, res) => {
  singleUpload(req, res, () => {
    if (req?.file?.key) {
      return res.json({ imageURL: req?.file?.location });
    } else {
      res.status(400).json('failed to upload');
    }
  });
});

module.exports = router;