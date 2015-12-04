var esclient = require('../data/esclient');

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