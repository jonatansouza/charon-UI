angular.module('charon').controller('InstancesController',
    function($scope, $routeParams, $http, $location) {
        console.log($routeParams.id);

        $http({
            method: 'GET',
            url: 'http://localhost:3000/api/openstack/servers'
        }).then(function(data) {
            $scope.servers = data.data;
        }, function(err) {
            console.log(err);
        });

    });
