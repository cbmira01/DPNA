
/*
  blogApp, an Angular demonstration for Code Louisville
    by Calvin Miracle, Louisville KY

  Thanks to K. Scott Allen for an excellent Angular tutorial
    https://www.youtube.com/playlist?list=PLBTXLYhPD8MHGMW-ZEvdAtkxyAz-N8Toj
*/

  var blogApp = angular.module("blogApp", ["ngRoute", "ngStorage"])
    .directive('myReflowPanels', function() {
      return function(scope, element, attrs) {
        if (scope.$last) setTimeout(function() {
          $(document).foundation('reflow');
        }, 1);
      };
    });

  blogApp.controller("HomeController", ["$scope", "$sessionStorage", function($scope, $sessionStorage) {   
    $scope.bloggers = $sessionStorage.bloggers;   
  }]);

  blogApp.controller("AllPostsController", ["$scope", "$sessionStorage", function($scope, $sessionStorage) {   
    $scope.posts = $sessionStorage.posts;
  }]);
  
  blogApp.controller("BloggersController", ["$scope", "$sessionStorage", function($scope, $sessionStorage) {

  }]);

  blogApp.controller("ResetController", ["$scope", "$sessionStorage", function($scope, $sessionStorage) {

    var bloggers = [
      {name: "Steve's Sports Bar",
       slogan: "I really enjoy sports!",
       photolink: "http://i.istockimg.com/file_thumbview_approve/13530019/6/stock-photo-13530019-happy-mature-man-with-a-blank-name-tag-against-white.jpg"
      },

      {name: "Shirley's Runway",
       slogan: "I write about fashion..",
       photolink: "http://i.istockimg.com/file_thumbview_approve/13529344/6/stock-photo-13529344-portrait-of-a-laughing-mature-female-against-white.jpg"
      },
      
      {name: "Sam's History Blog",
       slogan: "I blog on neighborhood history.",
       photolink: "http://images.freeimages.com/images/previews/fc7/an-old-man-1435337.jpg"
      }      
    ];

    var posts = [
      { UUID: "7f0c32a4-ef94-4e05-a284-50eb2f63c305",
        date: "Thu, 01 Jan 2010 00:00:00 GMT-0400",
        name: "Steve",
        title: "Basketball Game",
        text: "Great game last night! Check out this signed basketball! My first post..",
        image: "http://auction.steinersports.com/ItemImages/000002/SMITBKS000002_zoom_IMAGE1_238091_mid.jpeg"
      },
      { UUID: "068bcf68-eede-4e7b-bbb0-1fa648c74c02",
        date: "Thu, 01 Jan 2011 00:00:00 GMT-0400",
        name: "Shirley",
        title: "Goth look for Deer Park",
        text: "Bring out your inner Goth! My first post.",
        image: "https://lh5.googleusercontent.com/UL2Arkl8JPdfpCWo5yy6p3Ihfw9yT2abI8t5XGITbBmpqxYf_B_fUZINv4ii5kNok_wtNsznZk1wTxgWySSTT2369EvbFLPYdFLvMPGjCCOf0TfTtKH7iatgXeF9PIHM6Q"
      },
      { UUID: "4fced98b-e779-4b2c-b4da-b2a53b5db879",
        date: "Thu, 01 Jan 2012 00:00:00 GMT-0400",
        name: "Steve",
        title: "Baseball at Deer Park Stadium!",
        text: "Baseball under the lights at our new stadium. No image to share, sorry! My second sports post.",
        image: ""
      },
      { UUID: "0a8b39dd-b699-4665-912f-22639897c84b",
        date: "Thu, 01 Jan 2013 00:00:00 GMT-0400",
        name: "Shirley",
        title: "Lots of color!",
        text: "A very colorful new summer dress! My second post.",
        image: "http://rivista-cdn.palmspringslife.com/Palm-Springs-Life/May-2009/Fashion-Week-El-Paseo-2009-Wrap/Monday-March-23-Pacifica-Fashion-Runway-Bar/mondaylead.jpg?ver=1404319378"
      },
      { UUID: "b180bdf2-7a3f-4798-aa97-ee888b69c455",
        date: "Thu, 01 Jan 2014 00:00:00 GMT-0400",
        name: "Shirley",
        title: "New look for Deer Park",
        text: "Check out this interesting hair accessory! Third post for me.",
        image: "http://images.lacarmina.com/130325_tokyo_steampunk_club_steam_garden_party_fashion_japan_13.jpg"
      }
    ];

    $sessionStorage.bloggers = bloggers;
    $scope.message = "blogApp initial data has been reset.";
  }]);

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
      .when("/allposts", {
        templateUrl: "templates/allposts.html",
        controller: "AllPostsController"
      })      
      .when("/reset", {
        templateUrl: "templates/reset.html",
        controller: "ResetController"
      })
      .otherwise({redirectTo: "/"});
  });

