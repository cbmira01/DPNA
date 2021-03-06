
/*
  blogApp, an Angular demonstration for Code Louisville
    by Calvin Miracle, Louisville KY

  This application can do the following things:
    - list all bloggers and their photos;
    - list all posts from all bloggers;
    - list all posts from a particular blogger;
    - read a blog post in detail;
    - add and delete bloggers;
    - add and delete posts;
    - reset persistent data back to an initial state.

  This application demonstrates the following things:
    - browser session-storage for persistence;
    - color cycling on Foundation panels;
    - successful application of Foundation attributes after Angular DOM construction.

  Thanks to...
      K. Scott Allen for an excellent Angular tutorial.
          https://www.youtube.com/playlist?list=PLBTXLYhPD8MHGMW-ZEvdAtkxyAz-N8Toj
      Thomas Kilian for how to handle "DOM ready for Foundation reflow".
          http://stackoverflow.com/a/12243086
      sylwester for an idea contributing to color cycling.
          http://stackoverflow.com/a/24874022
      Anders Ekdahl for advice on Angular factories.
          http://stackoverflow.com/a/15026440
      John David Miller on how to iterate over object keys in an Angular view.
          http://stackoverflow.com/a/15127934
      zavidovych for a tip on Angular view refresh.
          http://stackoverflow.com/a/26345375
      "briguy37" for Javascript UUID function.
          http://jsfiddle.net/briguy37/2mvfd/
*/

  "use strict";

  var blogApp = angular.module("blogApp", ["ngRoute", "ngStorage"])


  // Directive to handle reflow rendering of Foundation panels.
  .directive("myReflowPanels", function($timeout) {
      return {
          link: function(scope, element, attrs) {
            $timeout(function() {
              $(document).foundation("reflow");
            });
          }
      };
  });


  blogApp.config(function($routeProvider) {
      $routeProvider
        .when("/", {
            templateUrl: "templates/home.html",
            controller: "HomeController"
        })
        .when("/add-blogger", {
            templateUrl: "templates/add-blogger.html",
            controller: "AddBloggerController"
        })
        .when("/add-post", {
            templateUrl: "templates/add-post.html",
            controller: "AddPostController"
        })
        .when("/list-posts/:bloggername", {
            templateUrl: "templates/list-posts.html",
            controller: "ListPostsController"
        })
        .when("/read-post/:uuid", {
            templateUrl: "templates/read-post.html",
            controller: "ReadPostController"
        })
        .when("/reset", {
            templateUrl: "templates/reset.html",
            controller: "ResetController"
        })
        .otherwise({
            redirectTo: "/"
        });
  });


  // myServices factory provides support functions for all controllers.
  blogApp.factory('myServices', function() {
      return {
          // Cycle through colors for Foundation panels.
          svcColorCycle: function(index) {
            // Colors are chosen from local CSS definitions.
              var colors = ["articleColorA",
                            "articleColorB",
                            "articleColorC",
                            "articleColorB",
                            "articleColorC"
              ];
              return ( colors[index%(colors.length)] );
          },

          // Handle case of no image provided.
          svcImageLink: function(tryImageLink) {
              if (tryImageLink === "") {
                  return "https://upload.wikimedia.org/wikipedia/commons/a/ac/No_image_available.svg";
              } else {
                  return tryImageLink;
              }
          }
      }; // end return
  });


  // Gets the app started with links to bloggers and their postings.
  blogApp.controller("HomeController",
                    ["$scope",
                     "$sessionStorage",
                     "myServices",
                     function($scope, $sessionStorage, myServices) {

      $scope.bloggers = $sessionStorage.bloggers;
      $scope.posts = $sessionStorage.posts;

      $scope.colorCycle = function(index) {
          return myServices.svcColorCycle(index);
      };

      $scope.imageLink = function(tryImageLink) {
          return myServices.svcImageLink(tryImageLink);
      };

      $scope.deleteBlogger = function(bloggerName) {
          for (var uuid in $scope.posts) {
              if ($scope.posts[uuid].name === bloggerName) {
                  delete $scope.posts[uuid];
              }
          }

          delete $scope.bloggers[bloggerName];

          $sessionStorage.bloggers = $scope.bloggers;
          $sessionStorage.posts = $scope.posts;
      };
  }]);


  blogApp.controller("ListPostsController",
                    ["$scope",
                     "$location",
                     "$routeParams",
                     "$route",
                     "$sessionStorage",
                     "myServices",
                     function($scope, $location, $routeParams, $route, $sessionStorage, myServices) {

      $scope.posts = $sessionStorage.posts;
      $scope.resultPosts = {};

      for (var uuid in $scope.posts) {
          if (      $routeParams.bloggername === $scope.posts[uuid].name
                 || $routeParams.bloggername === "all") {
              $scope.resultPosts[uuid] = $scope.posts[uuid];
          }
      }

      $scope.colorCycle = function(index) {
          return myServices.svcColorCycle(index);
      };

      $scope.imageLink = function(tryImageLink) {
          return myServices.svcImageLink(tryImageLink);
      };

      $scope.deletePost = function(uuid) {
          delete $scope.posts[uuid];
          $sessionStorage.posts = $scope.posts;
          $route.reload();
      };
  }]);


  blogApp.controller("ReadPostController",
                    ["$scope",
                     "$routeParams",
                     "$sessionStorage",
                     "myServices",
                     function($scope, $routeParams, $sessionStorage, myServices) {

      $scope.bloggers = $sessionStorage.bloggers;
      $scope.posts = $sessionStorage.posts;
      $scope.UUID = $routeParams.uuid;

      $scope.bloggerName = $scope.posts[$scope.UUID].name;
      $scope.postDate = $scope.posts[$scope.UUID].date;
      $scope.postTitle = $scope.posts[$scope.UUID].title;
      $scope.postText = $scope.posts[$scope.UUID].text;
      $scope.postImageLink = $scope.posts[$scope.UUID].image;

      $scope.bloggerSlogan = $scope.bloggers[$scope.bloggerName].slogan;
      $scope.bloggerResume = $scope.bloggers[$scope.bloggerName].resume;
      $scope.bloggerPhotoLink = $scope.bloggers[$scope.bloggerName].photolink;
  }]);


  blogApp.controller("AddBloggerController",
                    ["$scope",
                     "$location",
                     "$sessionStorage",
                     "myServices",
                     function($scope, $location, $sessionStorage, myServices) {

      $scope.bloggers = $sessionStorage.bloggers;
      $scope.message = "Add a blogger";

      $scope.newBloggerName = "";
      $scope.newSlogan = "";
      $scope.newResume = "";
      $scope.newImageLink = "";

      $scope.createBlogger = function() {
          if ($scope.newBloggerName === "" || $scope.bloggers[$scope.newBloggerName]) {
              $location.path("/");
              return;
          }

          if ($scope.newSlogan === "") {
              $scope.newSlogan = "A neighborhood blogger.";
          }

          if ($scope.newResume === "") {
              $scope.newResume = "Probably a pretty good person!";
          }

          $scope.bloggers[$scope.newBloggerName] = {
              name: $scope.newBloggerName,
              slogan: $scope.newSlogan,
              resume: $scope.newResume,
              photolink: $scope.newImageLink
          };

          $sessionStorage.bloggers = $scope.bloggers;
          $location.path("/");
      };
  }]);


  // Dialog for collecting and vetting new blogger information.
  blogApp.controller("AddPostController",
                    ["$scope",
                     "$location",
                     "$sessionStorage",
                     "myServices",
                     function($scope, $location, $sessionStorage, myServices) {

      $scope.bloggers = $sessionStorage.bloggers;
      $scope.posts = $sessionStorage.posts;
      $scope.message = "Add a post";

      $scope.defaultBloggerName = Object.keys($scope.bloggers)[0];  // just get the first blogger
      $scope.newBloggerName = "";
      $scope.newTitle = "";
      $scope.newText = "";
      $scope.newImageLink = "";

      $scope.submitPost = function() {
          if ($scope.newTitle === "") {
              $location.path("/list-posts/all");
              return;
          }

          var todaysDate = new Date();
          var uuid = generateUUID();

          if ($scope.newBloggerName === "") {
              $scope.newBloggerName = $scope.defaultBloggerName;
          }

          if ($scope.newTitle === "") {
              $scope.newTitle = "A new posting from " + $scope.newBloggerName;
          }

          if ($scope.newText === "") {
              $scope.newText = "Enjoy the photo!";
          }

          $scope.posts[uuid] = {
              date: todaysDate,
              name: $scope.newBloggerName,
              title: $scope.newTitle,
              text: $scope.newText,
              image: $scope.newImageLink
          };

          $sessionStorage.posts = $scope.posts;
          $location.path("/list-posts/all");
      };
  }]);


  // ResetController provides starting data for app demonstration.
  blogApp.controller("ResetController",
                    ["$scope",
                     "$location",
                     "$sessionStorage",
                     "myServices",
                     function($scope, $location, $sessionStorage, myServices) {

      delete $sessionStorage.bloggers;
      delete $sessionStorage.posts;

      var bloggers = {
        "Steve": {
            slogan: "Steve's Sports Bar: I really enjoy sports!",
            resume: "Energetic professional with extensive experience working closely with physicians, families, and peers. Recognized for ability to gain trust and credibility and for developing long-lasting relationships with patients. Experienced in triaging, diagnosing/treating patients, and working effectively as a team member while assuming a leadership role within an organization.",
            photolink: "http://i.istockimg.com/file_thumbview_approve/13530019/6/stock-photo-13530019-happy-mature-man-with-a-blank-name-tag-against-white.jpg"
        },

        "Shirley": {
            slogan: "Shirley's Runway: I write about fashion..",
            resume: "Innovative, financial professional with experience in accounting, financial and operational analysis. Success in month-end close accounting, budgeting, variance analysis, trend analysis, financial and productivity reporting. Strong record using financial systems including PeopleSoft, Cognos, and SAP. Energetic self-starter with a team-mined attitude and customer-oriented leadership capabilities.",
            photolink: "http://i.istockimg.com/file_thumbview_approve/13529344/6/stock-photo-13529344-portrait-of-a-laughing-mature-female-against-white.jpg"
        },

        "Sam": {
            slogan: "Sam's History Blog: I blog on neighborhood history.",
            resume: "Self-motivated and goal-oriented professional with natural leadership and communication skills. Wide-range of professional experiences in education, management, training and recruiting. Passionate about leading and motivating both associates and colleagues. Solid background in oral and written communication, preparation and delivery of presentations, interpersonal skills, and creative problem solving.",
            photolink: "http://images.freeimages.com/images/previews/fc7/an-old-man-1435337.jpg"
        }
      };  // end bloggers

      var posts = {
        "7f0c32a4-ef94-4e05-a284-50eb2f63c305": {
            date: "2010-11-22T18:48:41.705Z",
            name: "Steve",
            title: "Bellarmine Knights Basketball",
            text: "Great game last night! Check out this signed basketball! My first post. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras quis arcu et diam maximus volutpat eget egestas quam. Duis aliquam, justo sit amet posuere aliquet, leo nunc blandit est, et ultrices diam risus eget lorem. Vivamus ornare purus quis sem commodo facilisis. In bibendum at lacus tempus convallis. Proin convallis, lectus et pellentesque tincidunt, nunc massa tincidunt dolor, in posuere nisi tellus at turpis. Interdum et malesuada fames ac ante ipsum primis in faucibus. Ut ac tortor in ex sollicitudin elementum. Aliquam posuere porta ipsum. Integer non tincidunt erat. Sed condimentum sollicitudin arcu a vehicula.",
            image: "http://auction.steinersports.com/ItemImages/000002/SMITBKS000002_zoom_IMAGE1_238091_mid.jpeg"
        },
        "068bcf68-eede-4e7b-bbb0-1fa648c74c02": {
            date: "2012-11-22T18:48:41.705Z",
            name: "Shirley",
            title: "Deer Park Goth, Emo",
            text: "Bring out your inner Goth! My first post. Duis ac orci massa. Aenean blandit congue ipsum eu sodales. Donec mollis augue nisi, venenatis dapibus sapien efficitur vitae. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Maecenas eu lobortis felis, eu varius est. Donec at sem id erat tristique efficitur nec eu ipsum. Cras non facilisis libero, maximus dictum tortor.",
            image: "https://lh5.googleusercontent.com/UL2Arkl8JPdfpCWo5yy6p3Ihfw9yT2abI8t5XGITbBmpqxYf_B_fUZINv4ii5kNok_wtNsznZk1wTxgWySSTT2369EvbFLPYdFLvMPGjCCOf0TfTtKH7iatgXeF9PIHM6Q"
        },
        "4fced98b-e779-4b2c-b4da-b2a53b5db879": {
            date: "2011-11-22T18:48:41.705Z",
            name: "Steve",
            title: "Baseball at Deer Park Stadium..",
            text: "Baseball under the lights at our new stadium. No image to share, sorry! My second sports post. Donec faucibus orci eu pulvinar condimentum. Etiam faucibus, orci ut commodo suscipit, lorem est tincidunt nisl, et sodales mauris mauris vel nulla. Curabitur vestibulum faucibus urna, quis blandit tellus faucibus a. Donec sapien neque, posuere eleifend gravida porttitor, ultricies ac nibh. Mauris urna diam, auctor quis risus quis, ullamcorper congue nibh. Nullam luctus dui id felis ornare, sed pulvinar ipsum commodo. Nulla nisl orci, sollicitudin et vulputate consectetur, venenatis vel dolor. Praesent tristique rutrum tincidunt. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Nulla molestie ultricies eleifend.",
            image: ""
        },
        "0a8b39dd-b699-4665-912f-22639897c84b": {
            date: "2013-11-22T18:48:41.705Z",
            name: "Shirley",
            title: "Have a colorful summer!",
            text: "A very colorful new summer dress! My second post. Duis tincidunt vulputate nisl, at accumsan nulla bibendum blandit. Duis a libero quis ligula mollis finibus. Quisque venenatis sollicitudin feugiat. Donec magna felis, tristique a malesuada nec, congue ac neque. Cras rutrum tincidunt dolor nec rhoncus. Nulla augue neque, facilisis ornare felis eget, fringilla feugiat dui. Nullam scelerisque vestibulum nunc. Cras accumsan vehicula mi, ac fermentum tellus dictum ut. Proin at scelerisque orci. Nunc quis iaculis lacus. Ut ultrices sodales dapibus. Vestibulum dui lorem, dignissim eu urna ut, euismod volutpat mi. Ut at purus nulla. Donec euismod vestibulum rutrum.",
            image: "http://rivista-cdn.palmspringslife.com/Palm-Springs-Life/May-2009/Fashion-Week-El-Paseo-2009-Wrap/Monday-March-23-Pacifica-Fashion-Runway-Bar/mondaylead.jpg?ver=1404319378"
        },
        "b180bdf2-7a3f-4798-aa97-ee888b69c455": {
            date: "2014-11-22T18:48:41.705Z",
            name: "Shirley",
            title: "New look for Deer Park",
            text: "Check out this interesting hair accessory! Third post for me. Pellentesque urna libero, fringilla et arcu eget, dignissim interdum libero. Pellentesque urna libero, vulputate id tortor et, aliquam porttitor nibh. Sed at efficitur enim. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Etiam vel malesuada velit, quis tempus purus. Suspendisse faucibus elit non iaculis tincidunt. Curabitur blandit sem vitae dignissim bibendum. Donec et rutrum justo. In hac habitasse platea dictumst. Pellentesque ut commodo lectus.",
            image: "http://images.lacarmina.com/130325_tokyo_steampunk_club_steam_garden_party_fashion_japan_13.jpg"
        }
      }; // end posts

      $sessionStorage.bloggers = bloggers;
      $sessionStorage.posts = posts;
      $scope.message = "Application initial data has been reset.";

      //$location.path("/");
  }]);
