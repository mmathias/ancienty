'use strict';

angular.module('Ancienty.ancient', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/ancients', {
    templateUrl: 'ancients/ancients.html',
    controller: 'AncientsController'
  });
}]);
