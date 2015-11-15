 
/*
  blogApp, an Angular demonstration for Code Louisville
    by Calvin Miracle, Louisville KY
        
  Thanks to K. Scott Allen for an excellent Angular tutorial
    https://www.youtube.com/playlist?list=PLBTXLYhPD8MHGMW-ZEvdAtkxyAz-N8Toj
*/
    console.log("blogapp runs...");
    
  var app = angular.module("blogApp", ["ngRoute"]);  

  app.controller("BlogbaseController", ["$scope", function($scope) {
    console.log('view changed to BASE...'); 
    $scope.message = "You're now on the Blogbase channel...";
  }]);

  app.controller("BloggersController", ["$scope", function($scope) {
    console.log('view changed to BLOGGERS'); 
    $scope.message = "Now you're on the Bloggers channel!";
  }]);
  
  app.config(function($routeProvider) {
    $routeProvider
      .when("/", {
        templateUrl: "templates/blogbase.html",
        controller: "BlogbaseController"
      })    
      .when("/bloggers", {
        templateUrl: "templates/bloggers.html",
        controller: "BloggersController"
      })
      .otherwise({redirectTo: "/"});
  });

      console.log("blogapp finishes...");
      console.log(app);
      
      
      