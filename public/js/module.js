'use strict'; 

var app = angular.module("someApp", ["ui.router"]); 

app.config(function($stateProvider, $urlRouterProvider) {

  $stateProvider
    .state('home', { url: '/', templateUrl: '/html/home.html', controller: 'homeCtrl' })
    .state('todos', { url: '/', templateUrl: '/html/todos.html', controller: 'homeCtrl' })

  $urlRouterProvider.otherwise('/'); 
});


app.directive('myTable', function() {
  return {
    restrict: 'AE',
    scope: {
      list: '=',
      sorttext: '='
    },
    controller: 'myTableCtrl', 
    templateUrl: '/html/templates/myTable.html'
  };
});

app.filter('titlecase', function() {
  return function(input) {
    if (typeof input !== 'string') return input;
    return input[0].toUpperCase() + input.slice(1).toLowerCase(); 
  };
}); 

app.controller('myTableCtrl', function($scope){
  console.log("myTable ctrl");
  $scope.sort = function(key){
    console.log("sort!");
    if ($scope.sorttext === key) {
      $scope.sorttext = '-'+key;   
    } else {
      $scope.sorttext = key; 
    }
  }
})