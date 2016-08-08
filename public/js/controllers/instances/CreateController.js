angular.module('charon').controller('CreateController',
    function(defaultMessages, init, $scope, $routeParams, $http, $location, $interval) {
        $scope.charonLocate = init.protocol + init.url + ':' + init.port;
        $scope.nameInstance = '';
        $scope.waiting = false;

        $http({
            method: 'GET',
            url: $scope.charonLocate + '/api/openstack/images'
        }).then(function(data) {
            $scope.images = data.data;
            $scope.imageSelected = $scope.images[0];
        }, function(err) {
            console.log(err);
        });


        $http({
            method: 'GET',
            url: $scope.charonLocate + '/api/openstack/flavors'
        }).then(function(data) {
            $scope.flavors = data.data;
            $scope.flavorSelected = $scope.flavors[0];
        }, function(err) {
            console.log(err);
        });

        $scope.createInstance = function(nameInstance) {
            var data = {
                'name': nameInstance,
                'image': $scope.imageSelected.id,
                'flavor': $scope.flavorSelected.id
            }

            $http({
                method: 'POST',
                data: data,
                url: $scope.charonLocate + '/api/openstack/servers'
            }).then(function(data) {
                    $scope.waiting = true;
                    var serverTmp = data.data;
                    var promisse = $interval(function() {
                        $http({
                            method: 'GET',
                            url: $scope.charonLocate + '/api/openstack/servers/' + serverTmp.id
                        }).then(function(data) {
                            console.log(JSON.stringify(data.data));
                            if (data.data.status != "PROVISIONING") {

                                $interval.cancel(promisse);
                                $location.path('/instances').search({
                                    status: 'ok',
                                    message: defaultMessages.instances
                                });
                            } else {
                                console.log('attempt ' + data.status);
                            }
                        }, function(err) {
                            console.log(err);
                        });
                    }, 5000);
                },
                function(err) {
                    $location.path('/instances').search({
                        status: 'fail',
                        message: "ERROR: "+JSON.stringify(err)
                    });
                });
        };

    });
