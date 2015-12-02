app.controller('SettingsCtrl', function ($scope, SettingsService) {
    $scope.header = 'sup';
    $scope.settings = SettingsService.getSettings();
    console.log($scope.settings)
});