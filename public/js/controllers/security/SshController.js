angular.module('charon').controller('SshController',
    function(init, $timeout, $scope, $routeParams, $http, $location) {
        $scope.charonLocate = init.protocol + init.url + ':' + init.port;

        
        $scope.createKey = function(nameKey, key) {
            var data = {
                'name': nameKey,
                'public_key': key
            }

            $http({
                method: 'POST',
                data: data,
                url: $scope.charonLocate + '/api/openstack/keys'
            }).then(function(data) {
                    $location.path('/security').search({
                        status: 'ok',
                        message: "key Added!"
                    });
                },
                function(err) {
                    $location.path('/security').search({
                        status: 'fail',
                        message: "ERROR: " + JSON.stringify(err)
                    });
                });
        }
    });
