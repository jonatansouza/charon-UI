angular.module('charon').controller('HomeController',
    function($scope, $routeParams, $http, $location) {
        $scope.project = "Charon";
        $http({
            method: 'GET',
            url: 'http://localhost:3000/api/openstack/version'
        }).then(function(data) {
            $scope.version = data.data;
        }, function(err) {
            console.log(err);
        });

        $http({
            method: 'GET',
            url: 'http://localhost:3000/api/openstack/limits'
        }).then(function(data) {
            $scope.limits = data.data;
        }, function(err) {
            console.log(err);
        });

    });
