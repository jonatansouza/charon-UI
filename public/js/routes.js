angular.module('charon', ['ngRoute', 'ngBootbox'])
    .config(function($routeProvider) {
        $routeProvider.when('/home', {
                templateUrl: 'partials/home.html',
                controller: 'HomeController'
            })
            .when('/instances', {
                templateUrl: 'partials/instances/instances.html',
                controller: 'InstancesController'
            })
            .when('/editInstance', {
                templateUrl: 'partials/instances/editInstance.html',
                controller: 'EditController'
            })
            .when('/createInstance', {
                templateUrl: 'partials/instances/createInstance.html',
                controller: 'CreateController'
            })
            .when('/volumes', {
                templateUrl: 'partials/volumes/volumes.html',
                controller: 'VolumesController'
            })
            .when('/createVolume', {
                templateUrl: 'partials/volumes/createVolume.html',
                controller: 'VolumesCreateController'
            })
            .when('/attachVolume', {
                templateUrl: 'partials/volumes/attachVolume.html',
                controller: 'VolumeAttachController'
            })
            .when('/info', {
                templateUrl: 'partials/info/info.html',
                controller: 'InfoController'
            })
            .otherwise({
                redirectTo: '/home'
            });

    });
