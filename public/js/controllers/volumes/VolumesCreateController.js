angular.module('charon').controller('VolumesCreateController',
    function(defaultMessages, init, $scope, $routeParams, $http, $location, $interval) {
        $scope.sizeVolume = 5;
        $scope.charonLocate = init.protocol + init.url + ':' + init.port;

        $http({
            method: 'GET',
            url: $scope.charonLocate + '/api/openstack/types'
        }).then(function(data) {
            $scope.types = data.data;
            $scope.typeSelected = $scope.types[0].name;
        }, function(err) {
            console.log(err);
        });


        $scope.createVolume = function(nameVolume, descriptionVolume, sizeVolume) {
            var data = {
                'name': nameVolume,
                'description': descriptionVolume,
                'size': sizeVolume,
                'volumeType': $scope.typeSelected
            }

            $http({
                method: 'POST',
                data: data,
                url: $scope.charonLocate + '/api/openstack/volumes'
            }).then(function(data) {
                $scope.waiting = true;
                var tmpVolume = data.data;
                var promisse = $interval(function() {
                    $http({
                        method: 'GET',
                        url: $scope.charonLocate + '/api/openstack/volumes/' + tmpVolume.id
                    }).then(function(data) {
                        if (data.data.status != 'creating') {
                            $interval.cancel(promisse);
                            $location.path('/volumes').search({
                                status: 'ok',
                                message: defaultMessages.volumes
                            });
                        } else {
                            console.log("attempt " + data.data.status);
                        }

                    }, function(err) {
                        console.log(err);
                    });
                }, 5000);
            }, function(err) {
                console.log(err);
                $location.path('/volumes').search({
                    status: 'fail',
                    message: err
                });
            });
        };
    });
