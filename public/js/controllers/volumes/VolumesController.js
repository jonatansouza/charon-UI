angular.module('charon').controller('VolumesController',
    function(defaultMessages, init, $scope, $routeParams, $http, $location, $interval, $timeout, $ngBootbox, $route) {
        $scope.charonLocate = init.protocol + init.url + ':' + init.port;
        $scope.alertMessage = $routeParams.message || '';
        $scope.hideMessage = true;
        $scope.volumeToAttach = "";

        if (Boolean(Object.keys($routeParams).length)) {
            $timeout(function() {
                $scope.hideMessage = false;
                $location.search({});
            }, 10000);
        }


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
                        $scope.waitingMessage = defaultMessages.deleteVolume;
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
                        url: $scope.charonLocate + '/api/openstack/detach'
                    }).then(
                        function(data) {
                            console.log('detach');
                            $scope.waiting = true;
                            $scope.waitingMessage = defaultMessages.detachVolume
                            $ngBootbox.hideAll();
                            var promisse = $interval(function() {
                                $location.path('/volumes').search({
                                    status: "ok",
                                    message: "Volume dettached!"
                                });
                                $interval.cancel(promisse);
                            }, 7000);
                        },
                        function(err) {
                            console.log(err);
                            $location.path('/volumes').search({
                                status: "fail",
                                message: err
                            });
                        });
                },
                function() {
                    //
                });
        };

        $scope.volumeAttachOptions = function(volumeId) {
            $scope.volumeToAttach = volumeId;
            var options = {
                scope: $scope,
                templateUrl: '../templates/attachVolume.html'
            }
            $ngBootbox.customDialog(options);
        };

        $scope.volumeAttach = function(serverId) {
            var data = {
                server: serverId,
                volume: $scope.volumeToAttach
            }
            $http({
                method: 'POST',
                data: data,
                url: $scope.charonLocate + '/api/openstack/attach'
            }).then(function(data) {
                    $scope.waiting = true;
                    $scope.waitingMessage = defaultMessages.attachVolume;
                    $ngBootbox.hideAll();
                    var promisse = $interval(function() {
                        $scope.waiting = false;
                        $location.path('/volumes').search({
                            status: 'ok',
                            message: "Volume attached!!!"
                        });
                        $interval.cancel(promisse);
                    }, 10000);
                },
                function(err) {
                    $location.path('/instances').search({
                        status: 'fail',
                        message: "ERROR: " + JSON.stringify(err)
                    });
                });
        }
    });
