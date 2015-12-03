app.controller('CollectionsCtrl', function ($scope, CollectionsService) {
    $scope.header = 'sup';
    $scope.collections = CollectionsService.getCollection('default');
    console.log($scope.collections)
});