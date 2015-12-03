app.controller('CollectionsCtrl', function ($scope, CollectionsService) {
    $scope.header = 'sup';
    $scope.collectionResource = CollectionsService.getCollection('default');
    console.log($scope.collectionResource);
    //console.log($scope.collection)
    $scope.trySubmit = function () {
        console.log($scope.newCollectionRoot);
        console.log($scope.newCollectionForm)
        CollectionsService.saveCollection($scope.newCollectionRoot);
    }
    
});