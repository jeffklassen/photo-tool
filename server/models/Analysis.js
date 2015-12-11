var events = require('events');
var esclient = require('../data/esclient');
var crypto = require('crypto');
var walk = require('../utils/walk').walk;
var pathExifMapper = require('path-exif-mapper').PathExifMap;
var async = require('async');
var fs = require('fs');
var path = require('path');
var cp = require('child_process');


var Analysis = function (collection) {
	events.EventEmitter.call(this);

	this.collectionId = collection.id;
	this.startTime = new Date();
	this.status = "PENDING";
	this.rootPath = collection.rootPath;

	var md5sum = crypto.createHash('md5');
	md5sum.update(this.collectionId + this.startTime);
	this.id = md5sum.digest('hex');

	this.open = function () {
		this.emit('open');
	}

	var that = this;
	walk(that.rootPath, function (err, results) {
		console.log("walk complete. Encountered: " + results.length + " files.");
		var images = [];
		results.forEach(function (result) {
			if (result && result.toLowerCase().endsWith('jpg')) {
				images.push(result);
			}
		});

		that.totalImages = images.length;
		that.images = images;

		esclient.save("analysis", that, function (err, resp) {

			if (err) {

			}
			else {
				that.emit('initialized');
			}
		});

	});
}


Analysis.prototype.__proto__ = events.EventEmitter.prototype;

Analysis.prototype.analyze = function () {
	var that = this;
	that.processed = 0;

	async.forEachLimit(this.images, 4, function (image, callback) {
	
			console.log("Processing: " + image);

			var photo = {};

			async.parallel([
				function (pcallback) {
					pathExifMapper(image, function (err, srcImg, data) {
						pcallback(err, data);

					});
				},
				function (pcallback) {
					fs.stat(image, function (err, data) {
						pcallback(err, data);
					});
				}
			],
				function (err, results) {

					photo.analysisId = that.id;
					photo.exif = results[0];
					photo.stat = results[1];

					var md5sum = crypto.createHash('md5');
					md5sum.update(image);

					photo.id = md5sum.digest('hex');
					photo.path = image;
					
					var esChild = cp.fork(path.resolve(__dirname, '../data/esclient'));
					
					esChild.send({
						photo: photo
					});
					esChild.on('message',function(){
						callback();
					});
					that.processed++;
					that.emit('addedPhoto');
					
					

				});

	}, function (err) {
		if (err) {
			console.warn("end of each", err);
		}
		that.status = "COMPLETE";
		console.log("COMPLETE");

		esclient.save("analysis", that, function (err) {
			if (err) {

			}
			else {
				that.emit('complete');
			}
		});
	});
};



module.exports = Analysis;


