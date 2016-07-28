angular.module('charon').controller('HomeController',
    function($scope, $routeParams, $http, $location, $interval) {
        $scope.charonAPI = false;
        $scope.project = "Charon";
        $scope.charonLocate = 'http://localhost:3000/api/openstack/'

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
                url: 'http://localhost:3000/api/openstack/version'
            }).then(function(data) {
                $scope.charonAPI = true;
                $scope.version = data.data;
            }, function(err) {
                console.log(err);
            });

            $http({
                method: 'GET',
                url: 'http://localhost:3000/api/openstack/limits'
            }).then(function(data) {
                $scope.charonAPI = true;
                $scope.limits = data.data;
            }, function(err) {
                console.log(err);
            });
        }
    });
