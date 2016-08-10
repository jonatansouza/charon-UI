angular.module('charon').controller('InfoController',
    function(init, $scope, $routeParams, $http, $location) {
      $scope.charonLocate = init.protocol+init.url+':'+init.port;
        $http({
            method: 'GET',
            url: $scope.charonLocate+'/api/openstack/images'
        }).then(function(data) {
            $scope.images = data.data;

        }, function(err) {
            console.log(err);
        });
        $http({
            method: 'GET',
            url: $scope.charonLocate+'/api/openstack/flavors/'
        }).then(function(data) {
            $scope.flavors = data.data;

        }, function(err) {
            console.log(err);
        });

        $scope.deleteImage = function(image){
          $http({
            method: 'DELETE',
            url: $scope.charonLocate+'/api/openstack/images/'+image.id
          }).then(function(data){
              console.log(data);
          }, function(err){
              console.log(err);
          });
        }

    });
