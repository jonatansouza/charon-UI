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

        $scope.createInstance = function(nameInstance, image, flavor, key, group) {
            var data;
            if (typeof key === 'undefined') {
                data = {
                    'name': nameInstance,
                    'image': image,
                    'flavor': flavor
                }
            } else {
                data = {
                    'name': nameInstance,
                    'image': image,
                    'flavor': flavor,
                    'keyname': key.keypair.name
                }
            }


            console.log(data);

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
                        message: "ERROR: " + JSON.stringify(err)
                    });
                });
        };

    });
