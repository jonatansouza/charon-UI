angular.module('charon').controller('VolumesController',
    function(init, $scope, $routeParams, $http, $location, $interval, $timeout, $ngBootbox) {
        $scope.charonLocate = init.protocol + init.url + ':' + init.port;
        $scope.alertMessage = $routeParams.message || '';
        $scope.hideMessage = true;

        $timeout(function() {
            $scope.hideMessage = false;
        }, 2000);


        $http({
            method: 'GET',
            url: $scope.charonLocate + '/api/openstack/volumes'
        }).then(function(data) {
            $scope.volumes = data.data;
            $location.path('/volumes');
        }, function(err) {
            console.log(err);
        });

        $http({
            method: 'GET',
            url: $scope.charonLocate + '/api/openstack/servers'
        }).then(function(data) {
            $scope.servers = data.data;
        }, function(err) {
            console.log(err);
        });


        $scope.destroyVolume = function(volume, index) {
            $ngBootbox.confirm('Delete <strong>' + volume.name + '</strong> Volume?')
                .then(function() {
                    $http({
                        method: 'DELETE',
                        url: $scope.charonLocate + '/api/openstack/volumes/' + volume.id
                    }).then(function(data) {
                        $scope.waiting = true;
                        var tmpVolume = data.data;
                        var promisse = $interval(function() {
                            $http({
                                method: 'GET',
                                url: $scope.charonLocate + '/api/openstack/volumes/' + volume.id
                            }).then(function(data) {
                                console.log("attempt " + data.data.status);
                            }, function(err) {
                                $interval.cancel(promisse);
                                $location.path('/volumes').search({
                                    status: 'ok',
                                    message: "Volume deleted!"
                                });
                            });
                        }, 5000);
                    }, function(err) {
                        $location.path('/volumes').search({
                            status: "fail",
                            message: err
                        });
                    });
                });

        }

        $scope.typeMessage = function() {
            if ($routeParams.status == 'ok') {
                return "alert alert-success text-center"
            } else if ($routeParams.status == 'fail') {
                return "alert alert-danger text-center"
            } else {
                return "hide"
            }
        }

        $scope.getInstance = function(serverId) {
            console.log(serverId);
            $http({
                method: 'GET',
                url: $scope.charonLocate + '/api/openstack/servers/' + serverId
            }).then(function(data) {
                return "data.data";
            }, function(err) {
                console.log(err);
                return "undefined";
            });
        }

        $scope.volumeDetach = function(serverId, volumeId) {
            $ngBootbox.confirm('Are you sure to dettach this volume?').then(
                function() {
                    var data = {
                        server: serverId,
                        volume: volumeId
                    }
                    $http({
                        method: 'POST',
                        data: data,
                        url: $scope.charonLocate + '/api/openstack/servers/volumes/detach'
                    }).then(function(data) {
                            $location.path('/volumes').search({
                                status: 'ok',
                                message: "Volume detached device! " + data.data
                            });

                        },
                        function(err) {
                            $location.path('/instances').search({
                                status: 'fail',
                                message: "ERROR: " + JSON.stringify(err)
                            });
                        });


                },
                function() {

                });
        };

        $scope.volumeAttachOptions = function(volumeId) {
            var options = {
                scope: $scope,
                templateUrl: '../templates/attachVolume.html'
            }
            $ngBootbox.customDialog(options);
        };

        $scope.volumeAttach = function(server){
          console.log(server);
        }
    });
