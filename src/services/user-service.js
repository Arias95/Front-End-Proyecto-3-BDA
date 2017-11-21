angular.module('userService', []);
angular.module('userService', []).factory('userService', [function () {
    var loginService = {};
    loginService.usuario = "";

    return loginService;
}]);