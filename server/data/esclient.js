var elasticsearch = require('elasticsearch');
var crypto = require('crypto');

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
        apiVersion: '1.7'
    });
};

exports.getSettings = function (callback) {
    var client = getClient();
    client.get({
        index: index,
        type: 'settings',
        id: 'basic'
    }, function (err, resp) {
        if (err) {
            console.warn(1, err);
            
            //if there was an error, we want to insert a dummy basic settings
            client.indices.exists({ index: index + '/settings/basic' }, function (err, resp) {
                console.warn(2, err, resp);
                
                var emptyBasicSettings = { created: new Date()};
                if(err || resp == false){
                    client.create(
                        {index: index,
                    type:'settings',
                    id:'basic',
                    body:emptyBasicSettings
                    });
                      
                      callback(err, emptyBasicSettings);
                }
                else{
                    callback(err);
                }
                
              
            });
        }
        else{
             callback(null, resp._source);
        }

    });
};