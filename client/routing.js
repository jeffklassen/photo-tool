app.config(function ($routeProvider) {
    $routeProvider
        .when('/home', {
            controller: 'HomeCtrl',
            templateUrl: '/client/views/home.html'
        })
         .when('/collections', {
            controller: 'CollectionsCtrl',
            templateUrl: '/client/views/collections.html'
        })
        .otherwise({
            redirectTo: '/home'
        });
});