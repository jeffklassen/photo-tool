var esclient = require('../data/esclient');

exports.getDefaultCollection = function (req, res) {
	esclient.getDefaultCollection(function (err, resp) {
		if (err) {
			res.status(err.status || 500)
			res.send({ err: err, resp: resp });
		}
		res.send({ collection: resp });
	});
};
exports.listCollection = function (req, res) {
	throw "not yet implemented";
}