angular.module('charon').controller('EditController',
    function(init, $scope, $routeParams, $http, $location, $ngBootbox, $route, $interval) {
        $scope.charonLocate = init.protocol + init.url + ':' + init.port;
        if (!$routeParams.id) {
            $location.path('/instances');
        }

        //INIT VARS
        $scope.buttonAnimation = true;

        $http({
            method: 'GET',
            url: $scope.charonLocate + '/api/openstack/servers/' + $routeParams.id
        }).then(function(data) {
            $scope.server = data.data;
            $http({
                method: 'GET',
                url: $scope.charonLocate + '/api/openstack/images/' + $scope.server.imageId
            }).then(function(data) {
                $scope.server.image = data.data;

            }, function(err) {
                console.log(err);
            });
            $http({
                method: 'GET',
                url: $scope.charonLocate + '/api/openstack/flavors/' + $scope.server.flavorId
            }).then(function(data) {
                $scope.server.flavor = data.data;

            }, function(err) {
                console.log(err);
            });

        }, function(err) {
            console.log(err);
        });

        $scope.generateImage = function() {
            if ($scope.server.status != 'STOPPED') {
                $ngBootbox.customDialog({
                    message: '<span class="text-danger text-center">You must stop the instance before to procede!</span>',
                    title: '<b>Erro</b>',
                    buttons: {
                        ok: {
                            label: "close",
                            className: "btn-danger",
                            callback: function() {
                                $route.reload();
                            }
                        }
                    }
                });
            } else {
                $ngBootbox.prompt('Enter a name for your image:')
                    .then(function(inputName) {
                        var imageName = inputName || $scope.server.name;
                        $http({
                            method: 'POST',
                            url: $scope.charonLocate + '/api/openstack/images',
                            data: {
                                name: imageName,
                                server: $scope.server.id
                            }
                        }).then(function(data) {
                            $location.path('/instances').search({
                                status: 'ok',
                                message: "Image " + inputName + " created successful"
                            });
                        }, function(err) {
                            if (err.data.message == "Unexpected empty response") {
                                $location.path('/instances').search({
                                    status: 'ok',
                                    message: "Image " + inputName + " created successful"
                                });
                            } else {
                                $location.path('/instances').search({
                                    status: 'fail',
                                    message: "ERROR: " + JSON.stringify(err)
                                });
                            }
                        });
                    }, function() {
                        console.log('Prompt dismissed!');
                    });
            }

        };

        $scope.changeState = function() {
            console.log('change state');
            var uriState;
            if ($scope.server.status == "STOPPED") {
                uriState = '/api/openstack/server/start/';
            } else {
                uriState = '/api/openstack/server/stop/';
            }

            $http({
                method: 'GET',
                url: $scope.charonLocate + uriState + $scope.server.id
            }).then(function(data) {
                //waiting action
                //hold buttons
                $scope.buttonAnimation = false;
                var promisse = $interval(function() {
                    $http({
                        method: 'GET',
                        url: $scope.charonLocate + '/api/openstack/servers/' + $scope.server.id
                    }).then(function(data) {
                        if (data.status != $scope.server.status) {
                            $scope.server.status = data.status;
                            $interval.cancel(promisse);
                            $route.reload();
                        }
                    }, function(err) {
                        console.log(err);
                    });
                }, 5000);
            }, function(err) {
                console.log(err);
            });
        };

        $scope.allocateIp = function(myServer) {

            $http({
                method: 'POST',
                url: $scope.charonLocate + '/api/openstack/allocate',
                data: {
                    server: myServer
                }
            }).then(function(data) {

                $ngBootbox.alert("ip " + data.data.ip.ip + ' attached to instance!').then(function() {
                    $route.reload();
                });
            }, function(err) {
                $ngBootbox.customDialog({
                    message: '<span class="text-danger text-center">No ips available!</span>',
                    title: '<b>Erro</b>',
                    buttons: {
                        ok: {
                            label: "close",
                            className: "btn-danger",
                            callback: function() {}
                        }
                    }
                });
            });
        };

        $scope.deallocateIp = function(myServer, floatingIp) {

            $http({
                method: 'POST',
                url: $scope.charonLocate + '/api/openstack/remove/ip',
                data: {
                    server: myServer,
                    floatingIp: floatingIp
                }
            }).then(function(data) {
                $ngBootbox.alert('ip removed from instance!').then(function() {
                    $route.reload();
                });
            }, function(err) {
                $ngBootbox.customDialog({
                    message: '<span class="text-danger text-center">No ips available!</span>',
                    title: '<b>Erro</b>',
                    buttons: {
                        ok: {
                            label: "close",
                            className: "btn-danger",
                            callback: function() {}
                        }
                    }
                });
            });
        };

        $scope.remoteAccess = function(server) {
            console.log(server);
        }

    });
