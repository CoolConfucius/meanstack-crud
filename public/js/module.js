'use strict'; 

var app = angular.module("someApp", ["ui.router"]); 

app.config(function($stateProvider, $urlRouterProvider) {

  $stateProvider
    .state('home', { url: '/', templateUrl: '/html/home.html', controller: 'homeCtrl' })
    .state('todos', { url: '/', templateUrl: '/html/todos.html', controller: 'homeCtrl' })

  $urlRouterProvider.otherwise('/'); 
});

app.service('Todo', function($http) {
  
  this.todos = function() {
    return $http.get('/todos').then(res => {
      this.data = res.data; 
    }); 
  }; 

  this.add = function(todo) {
    return $http.post('/todos', todo)
  };
})

app.controller('homeCtrl', function($scope, $state, Todo){
  console.log("homeCtrl ctrl");
  $scope.todos = Todo.data;

  $scope.sort = function(key){
    console.log("sort!");
    if ($scope.sorttext === key) {
      $scope.sorttext = '-'+key;   
    } else {
      $scope.sorttext = key; 
    }
  };

  $scope.addTodo = function(todo){
    var newObj; 
    if (todo) {
      var description = todo.description ? todo.description : 'default description';
      newObj = {
        description: description, 
        date: Date.now(), 
        iscomplete: false
      }
    } 
    $scope.todos.push(newObj); 
    Todo.add(todo); 

  }


})


app.directive('myTable', function() {
  return {
    restrict: 'AE',
    scope: {
      list: '=',
      sorttext: '='
    },
    controller: 'myTableCtrl', 
    templateUrl: '/html/myTable.html'
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