angular.module('bdatienda')
    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/history', {
            templateUrl: '/src/app/home/history.html',
            controller: 'HistoryController'
        });
    }])

    .controller('HistoryController', ['$scope', '$location', 'userService',
        function ($scope, $location, userService) {
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
        }]);