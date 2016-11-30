angular.module('charon').controller('InstancesController',

    function(init, $scope, $routeParams, $http, $location, $timeout, $interval, $ngBootbox, $route) {

        $scope.charonLocate = init.protocol + init.url + ':' + init.port;
        $scope.alertMessage = $routeParams.message || '';
        $scope.hideMessage = true;
        $scope.waiting = false;
        $scope.stateServer = 'foo';

        $timeout(function() {
            $scope.hideMessage = false;
        }, 10000);

        $http({
            method: 'GET',
            url: $scope.charonLocate + '/api/openstack/servers'
        }).then(function(data) {
            $scope.servers = data.data;
        }, function(err) {
            console.log(err);
        });

        $scope.destroyInstance = function(server, index) {
            $ngBootbox.confirm('Delete <strong>' + server.name + '</strong> Instance?')
                .then(function() {
                    $http({
                        method: 'DELETE',
                        url: $scope.charonLocate + '/api/openstack/servers/' + server.id
                    }).then(function(data) {
                        $scope.waiting = true;
                        var promisse = $interval(function() {
                            $http({
                                method: 'GET',
                                url: $scope.charonLocate + '/api/openstack/servers/' + server.id
                            }).then(function(data) {
                                console.log("attempt " + data.data.status);
                            }, function(err) {
                                $interval.cancel(promisse);
                                $location.path('/instances').search({
                                    status: 'ok',
                                    message: 'Instance ' + server.name + ' deleted!'
                                });
                            });
                        }, 5000);
                    }, function(err) {
                        $location.path('/instances').search({
                            status: "fail",
                            message: err
                        });
                    });
                });

        }

        $scope.changeState = function(server) {
            var uriState;
            if (server.status == "STOPPED") {
                uriState = '/api/openstack/server/start/';
            } else {
                uriState = '/api/openstack/server/stop/';
            }

            $http({
                method: 'GET',
                url: $scope.charonLocate + uriState + server.id
            }).then(function(data) {
                $scope.stateServer = server.id;
                var promisse = $interval(function() {
                    $http({
                        method: 'GET',
                        url: $scope.charonLocate + '/api/openstack/servers/' + server.id
                    }).then(function(data) {
                        if (data.status == server.status) {
                            console.log('still the same');
                        } else {
                            $interval.cancel(promisse);
                            $scope.stateServer = 'foo';
                            $location.url($location.path());
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


        $scope.typeMessage = function() {
            if ($routeParams.status == 'ok') {
                return "alert alert-success text-center"
            } else if ($routeParams.status == 'fail') {
                return "alert alert-danger text-center"
            } else {
                return "hide"
            }
        }
    });
