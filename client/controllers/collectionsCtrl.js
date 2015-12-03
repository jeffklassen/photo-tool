app.controller('CollectionsCtrl', function ($scope, Collections) {
    $scope.header = 'sup';
    $scope.error = "";
    Collections.get({ id: 'default' }).$promise.then(function (resp) {
        $scope.collection = resp.collection;
    });
    console.log($scope.collectionResource);
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