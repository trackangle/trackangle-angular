'use strict';
define([
    'angular',
    'angular-route',
    'angular-cookies',
    'angular-google-maps',
    'config',
    '/static/javascripts/trackangle/route/controllers/route-controller.js',
    '/static/javascripts/trackangle/route/controllers/dashboard-controller.js',
    '/static/javascripts/trackangle/route/controllers/route-basics-controller.js',
    '/static/javascripts/trackangle/route/controllers/create-route-controller.js',
    '/static/javascripts/trackangle/place/controllers/place-controller.js',
    '/static/javascripts/trackangle/route/services/route-service.js',
    '/static/javascripts/trackangle/place/services/place-service.js',
    '/static/javascripts/trackangle/authentication/controllers/login.controller.js',
    '/static/javascripts/trackangle/authentication/controllers/register.controller.js',
    '/static/javascripts/trackangle/authentication/services/authentication.service.js',
    '/static/javascripts/trackangle/place/directives/ratingDirective.js'
], function (angular, ngRoute, ngCookies, angularGoogleMaps, config, RouteController, DashboardController, RouteBasicsController, CreateRouteController, PlaceController,
             RouteService, PlaceService, LoginController, RegisterController, AuthenticationService, ratingDirective) {

  var module = angular.module("trackangle", [
      'ngRoute',
      'ngCookies',
      'uiGmapgoogle-maps'
  ]);

  module.config(config);
  module.controller('RouteController', RouteController);
  module.controller('DashboardController', DashboardController);
  module.controller('RouteBasicsController', RouteBasicsController);
  module.controller('CreateRouteController', CreateRouteController);
  module.controller('PlaceController', PlaceController);
  module.controller('LoginController', LoginController);
  module.controller('RegisterController', RegisterController);
  module.factory('RouteService', RouteService);
  module.factory('PlaceService', PlaceService);
  module.factory('AuthenticationService', AuthenticationService);
  module.directive('ratingDirective', ratingDirective);

  module.controller('NavbarController', function ($scope, $http, $cookies) {
      $scope.logout = function() {
          return $http.post('/api/v1/auth/logout/')
              .then(logoutSuccessFn, logoutErrorFn);

          function logoutSuccessFn(data, status, headers, config) {
              unauthenticate();
              window.location = '/';
          }

          function logoutErrorFn(data, status, headers, config) {
              console.error('Epic failure!');
          }
      };
      function unauthenticate() {
        delete $cookies.authenticatedAccount;
    }
  });

  angular.bootstrap(document, ['trackangle']);


});
