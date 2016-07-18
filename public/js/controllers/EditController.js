angular.module('charon').controller('EditController',
    function($scope, $routeParams, $http, $location) {

        $http({
            method: 'GET',
            url: 'http://localhost:3000/api/openstack/servers/'+$routeParams.id
        }).then(function(data) {
            $scope.server = data.data;
        }, function(err) {
            console.log(err);
        });

    });
