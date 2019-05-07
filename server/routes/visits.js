const express = require('express');
const StreetArt = require('../models/StreetArt');
const Visit = require('../models/Visit');
const { isLoggedIn } = require('../middlewares')
const router = express.Router();

router.get('/my-visits', isLoggedIn, (req, res, next) => {
  Visit.find({ _user: req.user._id })
    .populate('_streetArt')
    .then(visits => {
      res.json(visits)
    })
});

router.post('/visits', isLoggedIn, (req, res, next) => {
  Visit.create({ 
    _user: req.user._id, 
    _streetArt: req.body._streetArt 
  })
    .then(visit => {
      res.json(visit)
    })
});

module.exports = router;