app.factory('CollectionsService', function($q, Collections) {
  return {
    getCollection: function (id) {
      return Collections.get({ id: id });
    },
    
    listCollections: function() {
      return Collections.list();
    },

    saveCollections: function(collections) {
      var deferred = $q.defer();
      collections.$save().then(function(collections) {
        deferred.resolve(collections);
      }, function(response) {
        deferred.reject(response.data.reason);
      });
      return deferred.promise;
    }
  }
})