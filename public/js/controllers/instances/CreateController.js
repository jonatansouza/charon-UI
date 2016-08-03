angular.module('charon').controller('CreateController',
    function(init, $scope, $routeParams, $http, $location) {
        $scope.charonLocate = init.protocol+init.url+':'+init.port;
        $scope.nameInstance = 'Sample';
        $http({
            method: 'GET',
            url: $scope.charonLocate+'/api/openstack/images'
        }).then(function(data) {
            $scope.images = data.data;
            $scope.imageSelected = $scope.images[0];
        }, function(err) {
            console.log(err);
        });


        $http({
            method: 'GET',
            url: $scope.charonLocate+'/api/openstack/flavors'
        }).then(function(data) {
            $scope.flavors = data.data;
            $scope.flavorSelected = $scope.flavors[0];
        }, function(err) {
            console.log(err);
        });

        $scope.createInstance = function() {
            var data = {
              'name': $scope.nameInstance,
              'image':$scope.imageSelected.id,
              'flavor':$scope.flavorSelected.id
            }

            $http({
                method: 'POST',
                data: data,
                url: $scope.charonLocate+'/api/openstack/servers'
            }).then(function(data) {
                console.log(data);
                $location.path('/instances');
            }, function(err) {
                console.log(err);
            });

        };

    });
