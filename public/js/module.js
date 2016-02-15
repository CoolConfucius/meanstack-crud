'use strict'; 

var app = angular.module("someApp", ["ui.router"]); 

// app.config(function($stateProvider, $urlRouterProvider) {

//   $stateProvider
//     .state('home', { url: '/', templateUrl: '/html/home.html', controller: 'homeCtrl' })
//     .state('todos', { url: '/', templateUrl: '/html/todos.html', controller: 'homeCtrl' })

//   $urlRouterProvider.otherwise('/'); 
// });

app.service('Todo', function($http) {
  
  this.todos = function() {
    return $http.get('/todos').then(res => {
      this.data = res.data; 
      console.log(this.data, "this data");
    }); 
  }; 

  this.getTodos = function(cb) {
    return $http.get('/todos').then(res => {
      this.data = res.data; 
      console.log(this.data, "this data");
      cb();
    }); 
  }

  this.add = function(todo) {
    return $http.post('/todos', todo)
  };

  this.toggle = function(todo) {
    return $http.put(`/todos/${todo}`)
  };

});

app.run(function(Todo, $rootScope){
  console.log("run app");
  Todo.todos();
  $rootScope.todos = Todo.data; 
});

app.controller('homeCtrl', function($rootScope, $scope, $state, Todo){
  $scope.getTodos = Todo.getTodos(function(){
    console.log("homeCtrl ctrl");
  // console.log(Todo.todos(), "here?"); 
    $rootScope.todos = Todo.data; 
    $scope.todos = $rootScope.todos;
    // $scope.todos = Todo.data;
    console.log("Scope todos", $scope.todos);
    console.log("Scope todos", Todo.data);
  });
  // $scope.getTodos(); 

  // console.log("homeCtrl ctrl");
  // // console.log(Todo.todos(), "here?"); 
  // $rootScope.todos = Todo.data; 
  // $scope.todos = $rootScope.todos;
  // // $scope.todos = Todo.data;
  // console.log("Scope todos", $scope.todos);
  // console.log("Scope todos", Todo.data);

  $scope.sort = function(key){
    console.log("sort!");
    if ($scope.sorttext === key) {
      $scope.sorttext = '-'+key;   
    } else {
      $scope.sorttext = key; 
    }
  };

  $scope.addTodo = function(todo){
    console.log("addTdod", todo);
    var newObj; 
    if (todo) {
      var description = todo.description ? todo.description : 'default description';
      newObj = {
        description: description, 
        date: Date.now(), 
        iscomplete: false
      }
      $scope.todos.push(newObj); 
    }  
    Todo.add(newObj); 
  };

  $scope.toggle = function(todo, index){
    console.log("todoid", todo);
    console.log("todoid", todo._id);
    console.log("index", index);
    $scope.todos[index].iscomplete = !$scope.todos[index].iscomplete;
    Todo.toggle(todo._id.toString()); 
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