app.config(function ($routeProvider) {
    $routeProvider
        .when('/home', {
            controller: 'HomeCtrl',
            templateUrl: '/client/views/home.html'
        })
        .otherwise({
            redirectTo: '/home'
        });
});