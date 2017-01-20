define([],function(){
  function config($routeProvider, $locationProvider, $httpProvider) {

      $httpProvider.defaults.xsrfHeaderName = 'X-CSRFToken';
      $httpProvider.defaults.xsrfCookieName = 'csrftoken';
      $locationProvider.html5Mode(true);
      $locationProvider.hashPrefix('!');

      $routeProvider
          .when("/register", {
              templateUrl: '/static/javascripts/trackangle/authentication/templates/register.html',
              controller: 'RegisterController'
          })
          .when("/login", {
              templateUrl: '/static/javascripts/trackangle/authentication/templates/login.html',
              controller: 'LoginController'
          })
          .when("/routes", {
              templateUrl: '/static/javascripts/trackangle/route/templates/dashboard.html',
              controller: 'DashboardController'
          })
          .when("/route/create/:url_title?", {
              templateUrl: '/static/javascripts/trackangle/route/templates/route_basics.html',
              controller: 'RouteBasicsController'
          })
          .when("/route/create/details/:url_title", {
              templateUrl: '/static/javascripts/trackangle/route/templates/create_route.html',
              controller: 'CreateRouteController',
              reloadOnSearch: false
          })
          .when("/route/:url_title", {
              templateUrl: '/static/javascripts/trackangle/route/templates/route_details.html',
              controller: 'RouteController'
          })
          .when("/place/:id", {
              templateUrl: '/static/javascripts/trackangle/place/templates/place_details.html',
              controller: 'PlaceController'
          })
          .otherwise({redirectTo: "/routes"});

  }
    config.$inject = ['$routeProvider', '$locationProvider', '$httpProvider'];
    return config;
});