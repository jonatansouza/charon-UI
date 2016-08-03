angular.module('charon').controller('EditController',
    function(init, $scope, $routeParams, $http, $location) {
        $scope.charonLocate = init.protocol+init.url+':'+init.port;
        $http({
            method: 'GET',
            url: $scope.charonLocate+'/api/openstack/servers/' + $routeParams.id
        }).then(function(data) {
            $scope.server = data.data;
            $http({
                method: 'GET',
                url: $scope.charonLocate+'/api/openstack/images/' + $scope.server.imageId
            }).then(function(data) {
                $scope.server.image = data.data;

            }, function(err) {
                console.log(err);
            });
            $http({
                method: 'GET',
                url: $scope.charonLocate+'/api/openstack/flavors/' + $scope.server.flavorId
            }).then(function(data) {
                $scope.server.flavor = data.data;

            }, function(err) {
                console.log(err);
            });

        }, function(err) {
            console.log(err);
        });

        $scope.generateImage = function() {
            $http({
                method: 'POST',
                url: $scope.charonLocate+'/api/openstack/images',
                data: {
                    name: $scope.server.name,
                    server: $scope.server.id
                }
            }).then(function(data) {
                console.log(data);
            }, function(err) {
                console.log(err);
            });

        }

    });
