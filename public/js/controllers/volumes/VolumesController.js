angular.module('charon').controller('VolumesController',
    function(init, $scope, $routeParams, $http, $location, $timeout) {
        $scope.charonLocate = init.protocol + init.url + ':' + init.port;
        $scope.alertMessage = $routeParams.message || '';
        $scope.hideMessage = true;

        $timeout(function() {
            $scope.hideMessage = false;
        }, 2000);


        $http({
            method: 'GET',
            url: $scope.charonLocate + '/api/openstack/volumes'
        }).then(function(data) {
            $scope.volumes = data.data;
            $location.path('/volumes');
        }, function(err) {
            console.log(err);
        });


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
