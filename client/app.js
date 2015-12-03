var app = angular.module('app', ['ngRoute', 'ngResource']);

app.run(function ($rootScope, Session, $location) {
	$rootScope.$on('$routeChangeStart', function (event) {

        if (!Session.getSession()) {
            
            console.log('DENY', Session.getSession(), event);
            //event.preventDefault();

            $location.path('/collections');
        }
        else {
            console.log('ALLOW', Session.getSession());
        }
    });
});