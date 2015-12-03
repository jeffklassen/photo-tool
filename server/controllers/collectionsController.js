var esclient = require('../data/esclient');

exports.getCollections = function (req, res) {
	esclient.getDefaultCollection(function (err, resp) {
		if (err) {
			res.status(err.status || 500)
			res.send({ err: err, resp: resp });
		}
		res.send({ collection: resp });
	});
};
