angular.module('charon').controller('SecurityController',
    function(init, $scope, $timeout, $routeParams, $http, $location, $ngBootbox, $route) {
        $scope.charonLocate = init.protocol + init.url + ':' + init.port;
        $scope.hideMessage = true;
        $scope.alertMessage = $routeParams.message || '';

        $timeout(function() {
            $scope.hideMessage = false;
        }, 10000);

        $http({
            method: 'GET',
            url: $scope.charonLocate + '/api/openstack/groups'
        }).then(function(data) {
            $scope.groups = data.data;

        }, function(err) {
            console.log(err);
        });
        $http({
            method: 'GET',
            url: $scope.charonLocate + '/api/openstack/keys'
        }).then(function(data) {
            $scope.keys = data.data;

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

        $scope.deleteImage = function(image) {
            $http({
                method: 'DELETE',
                url: $scope.charonLocate + '/api/openstack/images/' + image.id
            }).then(function(data) {
                console.log(data);
            }, function(err) {
                console.log(err);
            });
        }

        $scope.removeKey = function(key) {
            $ngBootbox.customDialog({
                message: 'Are you sure delete <b>' + key + '</b>',
                title: 'Warning',
                buttons: {
                    cancel: {
                        className: 'btn-default',
                        label: 'cancel',
                        callback: function() {}
                    },
                    ok: {
                        className: 'btn-danger',
                        label: 'delete',
                        callback: function() {
                            $http({
                                method: 'DELETE',
                                url: $scope.charonLocate + '/api/openstack/keys/' + key
                            }).then(function(data) {
                                console.log(data);
                            }, function(err) {
                                console.log(err);
                            });
                            $timeout(function() {
                                $location.path('/security').search({
                                  status:'ok',
                                  message: 'Group '+key+ ' deleted!'
                                });
                            }, 2000);
                        }

                    }

                }
            });

        };

        $scope.removeGroup = function(group) {
            $ngBootbox.customDialog({
                message: 'Are you sure delete <b>' + group.name + '</b>',
                title: 'Warning',
                buttons: {
                    cancel: {
                        className: 'btn-default',
                        label: 'cancel',
                        callback: function() {}
                    },
                    ok: {
                        className: 'btn-danger',
                        label: 'delete',
                        callback: function() {
                            $http({
                                method: 'DELETE',
                                url: $scope.charonLocate + '/api/openstack/groups/' + group.id
                            }).then(function(data) {
                                console.log(data);
                            }, function(err) {
                                console.log(err);
                            });
                            $timeout(function() {
                                $location.path('/security').search({
                                  status:'ok',
                                  message: 'Group '+group.name+ ' deleted!'
                                });
                            }, 2000);
                        }

                    }

                }
            });

        };
    });
