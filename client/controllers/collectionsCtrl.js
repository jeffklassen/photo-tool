app.controller('CollectionsCtrl', function ($scope, Collections, Session) {
    $scope.header = 'sup';
    $scope.error = "";
    
    $scope.$watch('collection', function (collection) {
        if (typeof $scope.collection !== 'undefined' && $scope.collection !== null) {
            var session = { collection: $scope.collection };
            console.log("Session created, returning session")
            Session.setSession(session);
        }
    });
    Collections.get({ id: 'default' }).$promise.then(function (resp) {
        $scope.collection = resp.collection;


    });

    //console.log($scope.collection)
    $scope.trySubmit = function () {
        $scope.error = "";

        Collections.save({ collectionRootPath: $scope.newCollectionRoot }).$promise.then(function (resp) {
            console.log("HERE", resp);
            $scope.collection = resp.collection
        }, function (err) {
            console.log("ERR", err);
            $scope.error = err.data;
            $scope.newCollectionForm.$submitted = false;
        });
    }

});