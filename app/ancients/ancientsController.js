'use strict';

angular.module('Ancienty.ancient')

.controller('AncientsController', ['$scope', '$http', function($scope, $http){
  $http.get('https://athena-7.herokuapp.com/ancients.json')
  .then(function(response) {
    $scope.ancients = response.data;
  });

  $scope.search = function() {
    $http.get('https://athena-7.herokuapp.com/ancients.json?search=' + $scope.searchText, {cache: true})
    .then(function(response) {
      $scope.ancients = response.data.ancients;
    });
  };

  $scope.showError = function() {
    $http.get('https://athena-7.herokuapp.com/ancients.json?error=true')
    .then(function(response) {
      $scope.ancients = response.data;
    }, function(response) {
      alert(response.data.error);
    });
  }
}]);

