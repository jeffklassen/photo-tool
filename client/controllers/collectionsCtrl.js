app.controller('CollectionsCtrl', function ($scope, CollectionsService) {
    $scope.header = 'sup';
    $scope.collections = CollectionsService.getCollections();
    console.log($scope.collections)
});