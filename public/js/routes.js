angular.module('charon', ['ngRoute'])
    .config(function($routeProvider) {
        $routeProvider.when('/home', {
                templateUrl: 'partials/home.html',
                controller: 'HomeController'
            })
            .when('/instances', {
                templateUrl: 'partials/instances.html',
                controller: 'InstancesController'
            })
            .otherwise({
                redirectTo: '/home'
            });

    });
