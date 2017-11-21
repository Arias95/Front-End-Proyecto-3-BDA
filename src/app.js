angular.module('bdatienda', [
    'ngRoute',
    'ngAnimate',
    'cartService',
    'userService',
    'restService'
])

    .config(['$httpProvider', function ($httpProvider) {
        $httpProvider.defaults.useXDomain = true;
        delete $httpProvider.defaults.headers.common['X-Requested-With'];
    }])

    .config(function ($routeProvider, $locationProvider) {
        // use the HTML5 History API
        $locationProvider.html5Mode(true);
    });