angular.module('charon').controller('VolumesCreateController',
    function(defaultMessages, init, $scope, $routeParams, $http, $location) {
        $scope.nameVolume = '';
        $scope.sizeVolume = 5;
        $scope.charonLocate = init.protocol+init.url+':'+init.port;

        $http({
            method: 'GET',
            url: $scope.charonLocate+'/api/openstack/volumes/types'
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
                url: $scope.charonLocate+'/api/openstack/volumes'
            }).then(function(data) {
                console.log(data);
                $location.path('/volumes').search({status:'ok', message: defaultMessages.volumes});
            }, function(err) {
                console.log(err);
                $location.path('/volumes').search({status:'fail', message: err});
            });

        };

    });
