var express = require('express');
var router = express.Router();
var settingsController = require('../controllers/settingsController');

router.get('/settings/', function (req, res, next) {
    settingsController.getSettings(req, res);
});

router.post('/settings/', function (req, res, next) {
    var location = req.params.location;
    var count = req.params.count;
    settingsController.addSettings(req, res, location, count);
});


module.exports = router;