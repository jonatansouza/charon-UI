angular.module('charon').controller('InstancesController',
    function(init, $scope, $routeParams, $http, $location) {
        $scope.charonLocate = init.protocol + init.url + ':' + init.port;
        $http({
            method: 'GET',
            url: $scope.charonLocate+'/api/openstack/servers'
        }).then(function(data) {
            $scope.servers = data.data;
        }, function(err) {
            console.log(err);
        });

    });
