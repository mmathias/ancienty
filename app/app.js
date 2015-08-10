'use strict';

angular.module('Ancienty', [
   'ngRoute',
   'Ancienty.ancient'
]).
config(['$routeProvider', function($routeProvider) {
  $routeProvider.otherwise({redirectTo: '/ancients'});
}]);
