angular.module('charon').controller('VolumesController',
    function(init, $scope, $routeParams, $http, $location) {
        $scope.charonLocate = init.protocol + init.url + ':' + init.port;
        $http({
            method: 'GET',
            url: $scope.charonLocate + '/api/openstack/volumes'
        }).then(function(data) {
            $scope.volumes = data.data;
            $location.path('/volumes');
        }, function(err) {
            console.log(err);
        });

    });
