angular.module('charon').controller('CreateController',
    function($scope, $routeParams, $http, $location) {
        $scope.nameInstance = 'Sample';
        $http({
            method: 'GET',
            url: 'http://localhost:3000/api/openstack/images'
        }).then(function(data) {
            $scope.images = data.data;
            $scope.imageSelected = $scope.images[0];
        }, function(err) {
            console.log(err);
        });


        $http({
            method: 'GET',
            url: 'http://localhost:3000/api/openstack/flavors'
        }).then(function(data) {
            $scope.flavors = data.data;
            $scope.flavorSelected = $scope.flavors[0];
        }, function(err) {
            console.log(err);
        });

        $scope.createInstance = function() {
            var data = {
              'name': $scope.nameInstance,
              'image':$scope.imageSelected.id,
              'flavor':$scope.flavorSelected.id
            }

            $http({
                method: 'POST',
                data: data,
                url: 'http://localhost:3000/api/openstack/servers'
            }).then(function(data) {
              console.log(data);
            }, function(err) {
                console.log(err);
            });

        };

    });
