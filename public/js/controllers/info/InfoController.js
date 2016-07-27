angular.module('charon').controller('InfoController',
    function($scope, $routeParams, $http, $location) {
        $http({
            method: 'GET',
            url: 'http://localhost:3000/api/openstack/images'
        }).then(function(data) {
            $scope.images = data.data;

        }, function(err) {
            console.log(err);
        });
        $http({
            method: 'GET',
            url: 'http://localhost:3000/api/openstack/flavors/'
        }).then(function(data) {
            $scope.flavors = data.data;

        }, function(err) {
            console.log(err);
        });

    });
