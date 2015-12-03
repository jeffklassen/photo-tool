app.factory('CollectionsService', function ($q, Collections) {
  return {
    getCollection: function (id) {
      return Collections.get({ id: id });
    },

    listCollections: function () {
      return Collections.list();
    },

    saveCollection: function (collectionRootPath) {
      var deferred = $q.defer();

      return Collections.save({ collectionRootPath: collectionRootPath });
    }
  }
})