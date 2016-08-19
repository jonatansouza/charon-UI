angular.module('charon').controller('EditController',
    function(init, $scope, $routeParams, $http, $location, $ngBootbox) {
        $scope.charonLocate = init.protocol + init.url + ':' + init.port;
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

        };
        $scope.allocateIp = function(myServer) {

            $http({
                method: 'POST',
                url: $scope.charonLocate + '/api/openstack/allocate',
                data: {
                    server: myServer
                }
            }).then(function(data) {
                alert(data)
            }, function(err) {
                console.log(err);
            });
        };

        $scope.remoteAccess = function(server) {
            console.log(server);
        }

    });
