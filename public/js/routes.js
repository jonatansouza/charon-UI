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
            .when('/editInstance', {
                templateUrl: 'partials/editInstance.html',
                controller: 'EditController'
            })
            .when('/createInstance', {
                templateUrl: 'partials/createInstance.html',
                controller: 'CreateController'
            })
            .otherwise({
                redirectTo: '/home'
            });

    });
