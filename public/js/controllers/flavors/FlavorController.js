angular.module('charon').controller('FlavorController',
    function(init, $scope, $routeParams, $http, $location) {
        $scope.charonLocate = init.protocol + init.url + ':' + init.port;
        $http({
            method: 'GET',
            url: $scope.charonLocate + '/api/openstack/flavors/'
        }).then(function(data) {
            $scope.flavors = data.data;

        }, function(err) {
            console.log(err);
        });
    });
