const express = require('express');
const StreetArt = require('../models/StreetArt');
const uploader = require('../configs/cloudinary');
const router = express.Router();

router.get('/', (req, res, next) => {
  StreetArt.find()
    .then(streetArts => {
      res.json(streetArts)
    })
});

router.get('/:streetArtId', (req, res, next) => {
  StreetArt.findById(req.params.streetArtId)
    .then(streetArt => {
      res.json(streetArt)
    })
});

// `uploader.single('picture')` parses the data send with the name `picture` and save information inside `req.file`
router.post('/', uploader.single('picture'), (req, res, next) => {
  let { lat, lng } = req.body
  let pictureUrl = req.file.url
  StreetArt.create({
    pictureUrl,
    location: {
      type: 'Point',
      coordinates: [lng,lat]
    }
  })
    .then(streetArt => {
      res.json(streetArt)
    })
    .catch(next)
});

module.exports = router;