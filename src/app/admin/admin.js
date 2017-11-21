angular.module('bdatienda')
    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/admin', {
            templateUrl: '/src/app/admin/history.html',
            controller: 'AdminController'
        })
            .when('/products', {
                templateUrl: '/src/app/admin/products.html',
                controller: 'ProductsController'
            })
            .when('/top-five', {
                templateUrl: '/src/app/admin/top-five.html',
                controller: 'TopController'
            })
            .when('/common', {
                templateUrl: '/src/app/admin/common.html',
                controller: 'CommonController'
            })
            .when('/add', {
                templateUrl: '/src/app/admin/add.html',
                controller: 'AdminController'
            })
            .when('/addMovie', {
                templateUrl: '/src/app/admin/addMovie.html',
                controller: 'AdminController'
            });
    }])

    .controller('AdminController', ['$scope', '$location', '$http', 'restService',
        function ($scope, $location, $http, restService) {
            $scope.activeUser = false;
            $scope.history = [];

            $scope.search = function () {
                var url = restService + '/order/getOrderbyUser';
                var usr = {
                    nombre: $scope.user
                };

                $http.post(url, usr).then(function (response) {
                    $scope.history = response.data.data;
                    $scope.activeUser = true;
                });
            }

            $scope.addConcert = function () {
                var event =  {
                    nombre: $scope.name,
                    lugar: $scope.place,
                    fechaI: $scope.fechaI,
                    fechaF: $scope.fechaF,
                    hora: $scope.time,
                    artista: $scope.artist,
                    precio: $scope.price
                };
                
                var url = restService + '/events/newEvent';
                $http.post(url, event).then(function (response) {
                    if (response.data.Status == 1) {
                        alert("Concierto agregado satisfactoriamente");
                        $location.path('/admin');
                    }
                });
            }

            $scope.addMovie = function () {
                var event =  {
                    nombre: $scope.name,
                    cadena: $scope.place,
                    fechaI: $scope.fechaI,
                    precio: $scope.price,
                    edad: $scope.age
                };
                
                var url = restService + '/events/newEvent';
                $http.post(url, event).then(function (response) {
                    if (response.data.Status == 1) {
                        alert("Película agregada satisfactoriamente");
                        $location.path('/admin');
                    }
                });
            }
        }])

    .controller('ProductsController', ['$scope', '$location', '$http', 'restService',
        function ($scope, $location, $http, restService) {
            $scope.products = [];
            var url = restService + '/order/getAllOrders';

            $http.get(url).then(function (response) {
                $scope.products = response.data.data;
            });
        }])
    .controller('TopController', ['$scope', '$location', '$http', 'restService',
        function ($scope, $location, $http, restService) {
            $scope.products = [];
            var url = restService + '/order/bestEvents';

            $http.get(url).then(function (response) {
                $scope.products = response.data.data;
            });
        }])
    .controller('CommonController', ['$scope', '$location', '$http', 'restService',
        function ($scope, $location, $http, restService) {
            $scope.activeUser = false;
            $scope.users = [];

            $scope.search = function () {
                var url = restService + '/order/commonClients';
                var usr = {
                    nombre: $scope.user
                };

                $http.post(url, usr).then(function (response) {
                    $scope.users = response.data.data;
                    $scope.activeUser = true;
                });
            };
        }]);