var express = require('express');
var router = express.Router();
var collectionsController = require('../controllers/collectionsController');

router.get('/collections/default', function (req, res, next) {
    collectionsController.getDefaultCollection(req, res);
});

router.post('/collections/', function (req, res, next) {
    var collectionRootPath = req.body.collectionRootPath;
    collectionsController.saveCollection(collectionRootPath, req, res);
});

module.exports = router;