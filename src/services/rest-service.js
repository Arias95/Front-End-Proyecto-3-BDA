angular.module('restService', [])
.factory('restService', [function () {
    var url = 'http://172.18.127.182:3000';
    return url;
}]);