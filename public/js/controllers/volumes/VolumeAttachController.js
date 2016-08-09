angular.module('charon').controller('VolumeAttachController',
    function(defaultMessages, init, $scope, $routeParams, $http, $location, $interval) {

        $scope.charonLocate = init.protocol + init.url + ':' + init.port;
        $scope.waiting = false;

        $http({
            method: 'GET',
            url: $scope.charonLocate + '/api/openstack/servers'
        }).then(function(data) {
            $scope.servers = data.data;
            $scope.serverSelected = $scope.servers[0];
        }, function(err) {
            console.log(err);
        });


        $http({
            method: 'GET',
            url: $scope.charonLocate + '/api/openstack/volumes'
        }).then(function(data) {
            $scope.volumes = data.data;
            $scope.volumeSelected =  $scope.volumes[0];
        }, function(err) {
            console.log(err);
        });

        $scope.attachVolume = function() {
            var data = {
                server: $scope.serverSelected.id,
                volume: $scope.volumeSelected.id
            }

            $http({
                method: 'POST',
                data: data,
                url: $scope.charonLocate + '/api/openstack/servers/volumes/attach'
            }).then(function(data) {
                    $location.path('/instances').search({
                        status: 'ok',
                        message: "Volume attached at device "+ data.data.device
                    });

                },
                function(err) {
                    $location.path('/instances').search({
                        status: 'fail',
                        message: "ERROR: " + JSON.stringify(err)
                    });
                });


        }


    });
