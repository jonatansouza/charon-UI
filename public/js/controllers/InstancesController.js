angular.module('charon').controller('InstancesController',
    function($scope, $routeParams, $http, $location) {
        $http({
            method: 'GET',
            url: 'http://localhost:3000/api/openstack/servers'
        }).then(function(data) {
            $scope.servers = data.data;
        }, function(err) {
            console.log(err);
        });

    });
