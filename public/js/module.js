'use strict'; 

var app = angular.module("someApp", ["ui.router"]); 

app.config(function($stateProvider, $urlRouterProvider) {

  $stateProvider
    .state('home', { url: '/', templateUrl: '/html/home.html', controller: 'homeCtrl' })
    .state('todos', { url: '/', templateUrl: '/html/todos.html', controller: 'homeCtrl' })

  $urlRouterProvider.otherwise('/'); 
});