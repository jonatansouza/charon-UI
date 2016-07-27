angular.module('charon').controller('VolumesController',
    function($scope, $routeParams, $http, $location) {
        $http({
            method: 'GET',
            url: 'http://localhost:3000/api/openstack/volumes'
        }).then(function(data) {
            $scope.volumes = data.data;
        }, function(err) {
            console.log(err);
        });

    });
