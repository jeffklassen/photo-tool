var esclient = require('../data/esclient');

exports.getSettings = function (req, res) {
	esclient.getSettings(function (err, resp) {
		if (err) {
			res.status(err.status || 500)
			res.send({ err: err, resp: resp });
		}
		res.send(resp)
	});
};
