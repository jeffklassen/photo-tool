var esclient = require('../data/esclient');
var fs = require('fs');
var os = require('os');
var crypto = require('crypto');

exports.getDefaultCollection = function (req, res) {
	esclient.getDefaultCollection(function (err, resp) {
		if (err) {
			res.status(err.status || 500)
			res.send({ err: err, resp: resp });
		}
		else {
			res.send({ collection: resp });
		}
	});
};
exports.listCollection = function (req, res) {
	throw "not yet implemented";
}
exports.saveCollection = function (collectionRootPath, req, res) {
	//remove trailing slashes
	collectionRootPath = collectionRootPath.replace(/\/+$/, "");
	try{fs.lstatSync(collectionRootPath).isDirectory()
		var md5sum = crypto.createHash('md5');

		var collection = {
			rootPath: collectionRootPath,
			hostname: os.hostname(),
		};

		md5sum.update(collection.rootPath + collection.hostname);
		collection.id = md5sum.digest('hex');
		console.log("Adding", collection);
		
		esclient.save("collections", collection, function (err, resp) {
			if (err) {
				res.status(err.status || 500)
				res.send({ err: err, resp: resp });
			}
			else {
				res.send({ collection: resp });
			}
		});
	}
	catch(e)
	{
		res.status(500);
		res.send("Collection root path is not a valid directory. " + collectionRootPath + " was not.");
	}
}