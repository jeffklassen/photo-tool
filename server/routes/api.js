var express = require('express');
var router = express.Router();
var collectionsController = require('../controllers/collectionsController');

router.get('/collections/', function (req, res, next) {
    collectionsController.getCollections(req, res);
});

router.post('/collections/', function (req, res, next) {
    var location = req.params.location;
    var count = req.params.count;
    collectionsController.addCollections(req, res, location, count);
});


module.exports = router;