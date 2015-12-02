app.config(function ($routeProvider) {
    $routeProvider
        .when('/home', {
            controller: 'homeCtrl',
            templateUrl: '/client/views/home.html'
        })
        .otherwise({
            redirectTo: '/home'
        });
});