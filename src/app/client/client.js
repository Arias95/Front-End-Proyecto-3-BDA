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

    .controller('ClientController', ['$scope', '$location', 'userService',
        function ($scope, $location, userService) {
            $scope.login = function () {
                userService.usuario = $scope.username;
                $location.path('/home');
            }

            $scope.reg = function() {
                $location.path('/register');
            }

            $scope.cancel = function() {
                $location.path('/');
            }
        }]);