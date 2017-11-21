angular.module('bdatienda')
    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/home', {
            templateUrl: '/src/app/home/home.html',
            controller: 'HomeController'
        })
            .when('/done', {
                templateUrl: '/src/app/home/purchase.html',
                controller: 'HomeController'
            });
    }])

    .controller('HomeController', ['$scope', '$location', '$http', 'cartService', 'userService', 'restService',
        function ($scope, $location, $http, cartService, userService, restService) {
            $scope.usuario = userService.usuario;
            $scope.nombre = userService.nombre;
            $scope.activeCart = false;
            $scope.cart = [];
            $scope.total = 0;
            $scope.confirmDiag = false;
            $scope.eventos = [];
            var urlEvents = restService + '/events/getAllEvents';
            
            $http.get(urlEvents).then(function (response) {
                $scope.eventos = response.data.data;
            });

            $scope.addCart = function (nombre, fecha, precio) {
                $scope.activeCart = true;
                if (isEvent(nombre)) {
                    raiseAmount(nombre);
                } else {
                    $scope.cart.push({
                        nombre: nombre,
                        cantidad: 1,
                        cost: precio
                    });
                }
            }

            $scope.removeCart = function (nombre) {
                let index = findEvent(nombre);
                if ($scope.cart.length == 1) {
                    $scope.activeCart = false;
                    setTimeout(function () {
                        $scope.cart.splice(index, 1);
                    }, 100);
                } else {
                    $scope.cart.splice(index, 1);
                }
            }

            $scope.cancelCart = function () {
                $scope.activeCart = false;
                setTimeout(function () {
                    $scope.cart = [];
                }, 100);

            }

            var isEvent = function (nombre) {
                for (let i = 0; i < $scope.cart.length; i++) {
                    if ($scope.cart[i].name == nombre) return true;
                }
                return false;
            }

            var raiseAmount = function (nombre) {
                for (let i = 0; i < $scope.cart.length; i++) {
                    if ($scope.cart[i].name == nombre) $scope.cart[i].cantidad++;
                }
            }

            var findEvent = function (nombre) {
                for (let i = 0; i < $scope.cart.length; i++) {
                    if ($scope.cart[i].name == nombre) return i;
                }
            }

            $scope.confirm = function () {
                for (let i = 0; i < $scope.cart.length; i++) {
                    $scope.total += ($scope.cart[i].cantidad * $scope.cart[i].cost);
                }
                $scope.confirmDiag = true;
            }

            $scope.cancelConfirm = function () {
                $scope.confirmDiag = false;
                setTimeout(function () {
                    $scope.total = 0;
                }, 100);
            }

            $scope.confirmPurchase = function () {
                cartService = $scope.cart;
                var today = Date();
                var url = restService + '/order/newOrder';
                var compra = {
                    cliente: $scope.nombre,
                    articulos: $scope.cart,
                    total: $scope.total,
                    fecha: today
                };
                $http.post(url, compra).then(function (response) {
                    if (response.data.Status == 1) {
                        $location.path('/done');
                    }
                });
                
            }

            $scope.logout = function () {
                userService.usuario = "";
                $location.path('/');
            }
        }]);