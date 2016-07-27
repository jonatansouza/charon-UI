angular.module('charon').controller('VolumesCreateController',
    function($scope, $routeParams, $http, $location) {
        $scope.nameVolume = '';
        $scope.sizeVolume = 5;

        $http({
            method: 'GET',
            url: 'http://localhost:3000/api/openstack/volumes/types'
        }).then(function(data) {
            $scope.types = data.data;
            $scope.typeSelected = $scope.types[0].name;
        }, function(err) {
            console.log(err);
        });


        $scope.createVolume = function() {
            var data = {
                'name': $scope.nameVolume,
                'description': $scope.descriptionVolume,
                'size': $scope.sizeVolume,
                'volumeType': $scope.typeSelected
            }

            $http({
                method: 'POST',
                data: data,
                url: 'http://localhost:3000/api/openstack/volumes'
            }).then(function(data) {
                console.log(data);
            }, function(err) {
                console.log(err);
            });

        };

    });
