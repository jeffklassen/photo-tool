var elasticsearch = require('elasticsearch');
var crypto = require('crypto');

process.on('message', function (msg) {
    if (msg.photo) {
        exports.save("photos", msg.photo, function () { process.send({}); process.exit(0);});
    }
});

var index = 'photo-tool';

var getClient = function () {

    // Connect the client to two nodes, requests will be
    // load-balanced between them using round-robin
    return elasticsearch.Client({
        hosts: [
            '192.168.1.41:9200',
            '192.168.1.42:9200',
            '192.168.1.43:9200',
            '192.168.1.44:9200',
            '192.168.1.45:9200'
        ],
        apiVersion: '2.1'
    });
};

exports.get = function (type, id, callback) {
    var client = getClient();
    console.log(type, id);
    client.get({
        index: index,
        type: type,
        id: id
    }, function (err, resp) {
        if (err) {
            console.warn(1, err);

        } else {
            console.warn(2, err, resp);

            callback(null, resp._source);
        }

    });
};

exports.getDefaultCollection = function (callback) {
    var client = getClient();
    client.search({
        index: index,
        type: 'collections',
        body: {
            query: {
                match_all: {}
            },
            size: 1
        }
    }, function (err, resp) {
        if (err) {
            console.warn(1, err);

        } else {

            if (resp.hits.total > 0) {
                console.warn(2, resp.hits.hits[0]._source);
                callback(null, resp.hits.hits[0]._source);
            }
            else {
                console.warn(2, "No collections found, returning null.");
                callback(null, null);
            }
        }

    });
};

exports.mostRecentAnalysis = function (collectionId, callback) {
    var client = getClient();
    client.search({
        index: index,
        type: 'analysis',
        body: {
            query: {
                filtered: {
                    query: {
                        match_all: {}
                    },
                    filter: {
                        term: {
                            collectionId: collectionId
                        }
                    }
                }
            },
            size: 1
        }
    }, function (err, resp) {
        if (err) {
            console.warn(1, err, resp);

            callback(err, resp);
        } else {

            if (resp.hits.total > 0) {
                console.warn(2, resp.hits.hits[0]._source);
                callback(null, resp.hits.hits[0]._source);
            }
            else {
                console.warn(2, "No analysis found, returning null.");
                callback(null, null);
            }
        }

    });
};

exports.save = function (type, body, callback) {
    var client = getClient();
    client.update({
        index: index,
        type: type,
        id: body.id,
        body: { doc: body, upsert: {} }
    }, function (err, resp) {
        if (err) {
            console.warn(1, err);
            callback(err);
        } else {
            callback(null, body);
        }
    });
};