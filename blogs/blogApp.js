 
/*
  blogApp, an Angular demonstration for Code Louisville
    by Calvin Miracle, Louisville KY
        
  Thanks to K. Scott Allen for an excellent Angular tutorial
    https://www.youtube.com/playlist?list=PLBTXLYhPD8MHGMW-ZEvdAtkxyAz-N8Toj
*/

  var blogApp = angular.module("blogApp", ["ngRoute"]);  

  blogApp.controller("HomeController", function($scope) {
    $scope.message = "You're now on the HOME channel...";
  });

  blogApp.controller("BloggersController", function($scope) {
    $scope.message = "Now you're on the BLOGGERS channel!";
  });
  
  blogApp.config(function($routeProvider) {
    $routeProvider
      .when("/", {
        templateUrl: "templates/home.html",
        controller: "HomeController"
      })    
      .when("/bloggers", {
        templateUrl: "templates/bloggers.html",
        controller: "BloggersController"
      })
      .otherwise({redirectTo: "/"});
  });
   
      