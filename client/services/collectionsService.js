app.factory('CollectionsService', function($q, Collections) {
  return {
    getCollections: function() {
      return Collections.query();
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