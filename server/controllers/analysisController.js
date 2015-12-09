var esclient = require('../data/esclient');
var crypto = require('crypto');
var fs = require('fs');
var Analysis = require('../models/Analysis');

String.prototype.endsWith = function (suffix) {
    return this.indexOf(suffix, this.length - suffix.length) !== -1;
};


exports.getMostRecent = function (collectionId, req, res) {
	esclient.mostRecentAnalysis(collectionId, function (err, resp) {
		if (err) {
			res.send({ err: err, analysis: resp });
		}
		else {
			res.send({ analysis: resp });
		}
	});
};

exports.start = function (collectionId, req, res) {
	esclient.get("collections", collectionId, function (err, collection) {
		var analysis = new Analysis(collection);

		analysis.on('initialized', function () {
			analysis.analyze();
			res.send(analysis);
		});
		analysis.on('addedPhoto', function () {
			console.log("Analyzed: " + analysis.processed + " of " + analysis.images.length)
		});

	});


};