const express = require('express');
const StreetArt = require('../models/StreetArt');
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

module.exports = router;