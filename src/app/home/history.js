angular.module('bdatienda')
    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/history', {
            templateUrl: '/src/app/home/history.html',
            controller: 'HistoryController'
        });
    }])

    .controller('HistoryController', ['$scope', '$location', '$http', 'userService', 'restService',
        function ($scope, $location, $http, userService, restService) {
            $scope.history = [];
            $scope.nombre = userService.nombre;
            var url = restService + '/order/getOrderbyUser';
            var user = {
                nombre: $scope.nombre
            };

            $http.post(url, user).then(function (response) {
                $scope.history = response.data.data;
            });
        }]);