angular.module('charon').controller('InstancesController',

    function(init, $scope, $routeParams, $http, $location, $timeout) {

        $scope.charonLocate = init.protocol + init.url + ':' + init.port;
        $scope.alertMessage = $routeParams.message || '';
        $scope.hideMessage = true;

        $timeout(function() {
            $scope.hideMessage = false;
        }, 2000);

        $http({
            method: 'GET',
            url: $scope.charonLocate + '/api/openstack/servers'
        }).then(function(data) {
            $scope.servers = data.data;
        }, function(err) {
            console.log(err);
        });

        $scope.destroyInstance = function() {
            /*  $ngBootbox.alert('An important message!')
                  .then(function() {
                      console.log('Alert closed');
                  });*/
            $http({
                method: 'GET',
                url: $scope.charonLocate + '/api/openstack/servers'
            }).then(function(data) {
                $scope.servers = data.data;
            }, function(err) {
                console.log(err);
            });
        }


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
