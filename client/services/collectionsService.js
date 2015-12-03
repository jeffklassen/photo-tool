app.factory('CollectionsService', function ($q, Collections) {
  return {
    getCollection: function (id) {
      console.log('cservice', Collections.get({ id: id }));
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