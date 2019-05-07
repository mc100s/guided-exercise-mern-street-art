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

router.delete('/visits/:visitId', isLoggedIn, (req, res, next) => {
  Visit.findOneAndDelete({ 
    _id: req.params.visitId,
    _user: req.user._id
  })
    .then(visit => {
      if (visit) {
        res.json({
          message: 'The visit was successfully deleted',
        })
      }
      else {
        res.json({
          message: `There is no visit with the id "${req.params.visitId} or you are not the owner"`,
        })
      }
    })
});

module.exports = router;