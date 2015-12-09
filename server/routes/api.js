var express = require('express');
var router = express.Router();
var collectionsController = require('../controllers/collectionsController');
var analysisController = require('../controllers/analysisController');


router.get('/analysis/:collectionId', function (req, res, next) {
    analysisController.getMostRecent(req.params.collectionId, req, res);
});
router.post('/analysis/', function (req, res, next) {
    console.log(req.body);
    analysisController.start(req.body.collectionId, req, res);
});

router.get('/collections/default', function (req, res, next) {
    collectionsController.getDefaultCollection(req, res);
});

router.post('/collections/', function (req, res, next) {
    var collectionRootPath = req.body.collectionRootPath;
    collectionsController.saveCollection(collectionRootPath, req, res);
});

module.exports = router;