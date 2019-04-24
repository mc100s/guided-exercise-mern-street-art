const express = require('express');
const StreetArt = require('../models/StreetArt');
const router = express.Router();

router.get('/', (req, res, next) => {
  StreetArt.find()
    .then(streetArts => {
      res.json(streetArts)
    })
});

module.exports = router;