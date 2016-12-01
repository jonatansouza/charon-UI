angular.module('charon').controller('CreateController',
    function(defaultMessages, init, $scope, $routeParams, $http, $location, $interval, $base64) {
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

        $http({
            method: 'GET',
            url: $scope.charonLocate + '/api/openstack/keys'
        }).then(function(data) {
            $scope.keys = data.data;
            $scope.keySelected = $scope.keys[0];
        }, function(err) {
            console.log(err);
        });

        $http({
            method: 'GET',
            url: $scope.charonLocate + '/api/openstack/groups'
        }).then(function(data) {
            $scope.groups = data.data;
            $scope.groupSelected = $scope.groups[0];
        }, function(err) {
            console.log(err);
        });

        $http({
            method: 'GET',
            url: $scope.charonLocate + '/api/openstack/networks'
        }).then(function(data) {
            $scope.networks = data.data;
            for (var i = 0; i < $scope.networks.length; i++) {
                if ($scope.networks[i].name == 'private') {
                    $scope.networkSelected = $scope.networks[i];
                }
            }
        }, function(err) {
            console.log(err);
        });

        $scope.createInstance = function(nameInstance, cloudInit, image, flavor, key, group) {
            var data;
            data = {
                'name': nameInstance,
                'image': image,
                'flavor': flavor,
                'keyname': key,
                'networks': [{
                    'uuid': $scope.networkSelected.id
                }]
            }

            console.log(data);
            $scope.waiting = true;
            $http({
                method: 'POST',
                data: data,
                url: $scope.charonLocate + '/api/openstack/servers'
            }).then(function(data) {
                    var promisse = $interval(function() {
                        $http({
                            method: 'GET',
                            url: $scope.charonLocate + '/api/openstack/servers/' + data.data.id
                        }).then(function(data) {
                            if (data.data.status != 'PROVISIONING') {
                                console.log(JSON.stringify(data.data));
                                $interval.cancel(promisse);
                                $location.path('/instances').search({
                                    status: 'ok',
                                    message: defaultMessages.instances
                                });
                            } else {
                                console.log("attempt " + data.data.status);
                            }

                        }, function(err) {
                            console.log(err);
                        });
                    }, 5000);
                },
                function(err) {
                    console.log(err);
                    $location.path('/instances').search({
                        status: 'fail',
                        message: "ERROR: " + JSON.stringify(err.data.result)
                    });
                });
        };

    });
