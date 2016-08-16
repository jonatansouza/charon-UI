angular.module('charon').controller('NetworkController',
    function(init, $scope, $routeParams, $http, $location, $ngBootbox) {
        $scope.charonLocate = init.protocol + init.url + ':' + init.port;

        $http({
            method: 'GET',
            url: $scope.charonLocate + '/api/openstack/networks'
        }).then(function(data) {
            $scope.networks = data.data;
        }, function(err) {
            console.log(err);
        });


        $scope.destroyNetwork = function(network, index) {
            $ngBootbox.confirm('Delete <strong>' + network.name + '</strong> Network?')
                .then(function() {
                    $http({
                        method: 'DELETE',
                        url: $scope.charonLocate + '/api/openstack/networks/' + network.id
                    }).then(function(data) {
                        $scope.waiting = true;
                        var promisse = $interval(function() {
                            $http({
                                method: 'GET',
                                url: $scope.charonLocate + '/api/openstack/networks/' + network.id
                            }).then(function(data) {
                                console.log("attempt " + data.data.status);
                            }, function(err) {
                                $interval.cancel(promisse);
                                $location.path('/instances').search({
                                    status: 'ok',
                                    message: 'Instance ' + network.name + ' deleted!'
                                });
                            });
                        }, 5000);
                    }, function(err) {
                        $location.path('/network').search({
                            status: "fail",
                            message: err
                        });
                    });
                });
        }
    });
