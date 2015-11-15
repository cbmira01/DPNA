
/*
  blogApp, an Angular demonstration for Code Louisville
    by Calvin Miracle, Louisville KY
        
  Thanks to K. Scott Allen for an excellent Angular tutorial
    https://www.youtube.com/playlist?list=PLBTXLYhPD8MHGMW-ZEvdAtkxyAz-N8Toj
*/

  "use strict";
  
  var blogApp = angular.module("blogApp", ["ngRoute"]);
  
  blogApp.config = (function($routeProvider) {
    $routeProvider
      .when("/", {
        templateUrl: "blogbase.html",
        controller: "BlogbaseController"
      })    
      .when("/bloggers", {
        templateUrl: "bloggers.html",
        controller: "BloggersController"
      })
      .otherwise({redirectTo: "/"});
  });

  blogApp.controller("BlogbaseController", function($scope) {
    $scope.message = "You're now on the Blogbase channel...";
  });

  blogApp.controller("BloggersController", function($scope) {
    $scope.message = "Now you're on the Bloggers channel!";
  });
  
  