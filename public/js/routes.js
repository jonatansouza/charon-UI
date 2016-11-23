angular.module('charon', ['ngRoute', 'ngBootbox', 'angular-loading-bar','base64'])
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
            .when('/templates', {
                templateUrl: 'partials/templates/template.html',
                controller: 'TemplateController'
            })
            .when('/flavors', {
                templateUrl: 'partials/flavors/flavor.html',
                controller: 'FlavorController'
            })
            .when('/networks', {
                templateUrl: 'partials/networks/networks.html',
                controller: 'NetworkController'
            })
            .when('/security', {
                templateUrl: 'partials/security/security.html',
                controller: 'SecurityController'
            })
            .when('/createKey', {
                templateUrl: 'partials/security/ssh.html',
                controller: 'SshController'
            })
            .otherwise({
                redirectTo: '/home'
            });

    });
