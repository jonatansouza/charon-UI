angular.module('charon').
controller('HomeController',
    function(init, $scope, $routeParams, $http, $location, $interval) {

        $scope.charonAPI = false;
        $scope.project = "Charon";
        $scope.charonLocate = init.protocol+init.url+':'+init.port;

        connectingCharon();
        if (!$scope.charonAPI) {
            var promisse = $interval(function() {
                if (!$scope.charonAPI) {
                    console.log('attemp ');
                    connectingCharon();
                } else {
                    $interval.cancel(promisse);
                }
            }, 7000, 5);
        }


        function connectingCharon() {
            $http({
                method: 'GET',
                url: $scope.charonLocate+'/api/openstack/version'
            }).then(function(data) {
                $scope.charonAPI = true;
                $scope.version = data.data;
            }, function(err) {
                console.log(err);
            });

            $http({
                method: 'GET',
                url: $scope.charonLocate+'/api/openstack/limits'
            }).then(function(data) {
                $scope.charonAPI = true;
                $scope.limits = data.data;
            }, function(err) {
                console.log(err);
            });
        }
    });
