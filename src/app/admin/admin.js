angular.module('bdatienda')
    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/admin', {
            templateUrl: '/src/app/admin/history.html',
            controller: 'AdminController'
        });
    }])

    .controller('AdminController', ['$scope', '$location',
        function ($scope, $location) {
            $scope.activeUser = false;
            $scope.history = [
                {
                    fecha: "11-11-2017",
                    total: 3000,
                    productos: [
                        {
                            nombre: "Thor"
                        }
                    ]
                },
                {
                    fecha: "11-11-2017",
                    total: 53000,
                    productos: [
                        {
                            nombre: "Concierto de Incubus"
                        },
                        {
                            nombre: "Thor"
                        }
                    ]
                }
            ];

            $scope.search = function () {
                $scope.activeUser = true;
            }
        }]);