angular.module('bdatienda')
    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/', {
            templateUrl: '/src/app/client/login.html',
            controller: 'ClientController'
        })
        .when('/register', {
            templateUrl: '/src/app/client/register.html',
            controller: 'ClientController'
        });
    }])

    .controller('ClientController', ['$scope', '$location', '$http', 'userService', 'restService', 'cartService',
        function ($scope, $location, $http, userService, restService, cartService) {
            
            $scope.login = function () {
                console.log(cartService);
                var url = restService + '/users/loginClient';
                var usr = {
                    id: $scope.username,
                    password: $scope.password

                };

                $http.post(url, usr).then(function (response) {
                    if (response.data.Status == "1") {
                        userService.usuario = response.data.id;
                        userService.nombre = response.data.nombre;
                        $location.path('/home');
                    } else if (response.data.Status == "2") {
                        $location.path('/admin');
                    } else {
                        alert("Usuario o contraseña incorrecta.");
                    }
                });
            }

            $scope.register = function () {
                console.log(restService);

                var url = restService + '/users/registerClient';

                var usr = {
                    id: $scope.username,
                    password: $scope.password,
                    nombre: $scope.fName + ' ' + $scope.lName,
                    nacimiento: $scope.bDay,
                    sexo: $scope.gender
                }

                $http.post(url, usr).then(function successCallback(response) {
                    if (response.data.Status == 1) {
                        userService.usuario = $scope.username;
                        userService.nombre = $scope.fName + ' ' + $scope.lName;
                        $location.path('/home');
                    }
                });
            }

            $scope.reg = function() {
                $location.path('/register');
            }

            $scope.cancel = function() {
                $location.path('/');
            }
        }]);