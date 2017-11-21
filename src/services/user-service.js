angular.module('userService', []).factory('userService', [function () {
    var loginService = {};
    loginService.usuario = "";
    loginService.nombre = "";

    return loginService;
}]);