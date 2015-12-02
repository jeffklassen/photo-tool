app.config(function ($routeProvider) {
    $routeProvider
        .when('/home', {
            controller: 'HomeCtrl',
            templateUrl: '/client/views/home.html'
        })
         .when('/settings', {
            controller: 'SettingsCtrl',
            templateUrl: '/client/views/settings.html'
        })
        .otherwise({
            redirectTo: '/home'
        });
});