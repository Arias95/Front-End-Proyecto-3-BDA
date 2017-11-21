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

    .controller('HomeController', ['$scope', '$location', 'cartService', 'userService',
        function ($scope, $location, cartService, userService) {
            $scope.usuario = userService.usuario;
            console.log(userService);
            $scope.activeCart = false;
            $scope.cart = [];
            $scope.total = 0;
            $scope.confirmDiag = false;
            $scope.eventos = [
                {
                    nombre: "Concierto mediocre",
                    descripcion: "Para maes blancos heterosexuales que creen saber de musica.",
                    fecha: "2/12/2017",
                    precio: 40000
                },
                {
                    nombre: "Concierto decente",
                    descripcion: "Solo pasa una vez al año y vamos a cobrar un riñón.",
                    fecha: "3/12/2017",
                    precio: 120000
                },
                {
                    nombre: "Perreo Fest",
                    descripcion: "Lo que realmente promete y usted quiere ir de fijo.",
                    fecha: "4/12/2017",
                    precio: 20000
                }
            ];

            $scope.addCart = function (nombre, fecha, precio) {
                $scope.activeCart = true;
                if (isEvent(nombre)) {
                    raiseAmount(nombre);
                } else {
                    $scope.cart.push({
                        name: nombre,
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
                // TODO: HTTP Post al server
                $location.path('/done');
            }

            $scope.logout = function () {
                userService.usuario = "";
                $location.path('/');
            }
        }]);