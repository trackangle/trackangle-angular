define(['angularAMD', 'angular-route', 'angular-cookies', 'angular-google-maps'], function (angularAMD) {
    'use strict';

  var trackangle = angular.module("trackangle", ['ngRoute', 'ngCookies', 'uiGmapgoogle-maps']);

  trackangle.controller('NavbarController', function ($scope, $http, $cookies) {
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
      }
      function unauthenticate() {
        delete $cookies.authenticatedAccount;
    }
  });

  trackangle.config(function ($routeProvider, $locationProvider, $httpProvider) {
    $httpProvider.defaults.xsrfHeaderName = 'X-CSRFToken';
	$httpProvider.defaults.xsrfCookieName = 'csrftoken';
    $locationProvider.html5Mode(true);
    $locationProvider.hashPrefix('!');

    $routeProvider
    .when("/register", angularAMD.route({
        templateUrl: '/static/javascripts/angular/authentication/templates/register.html',
        controller: 'RegisterController',
        controllerUrl: '/static/javascripts/angular/authentication/controllers/register.controller.js'
    }))
    .when("/login", angularAMD.route({
        templateUrl: '/static/javascripts/angular/authentication/templates/login.html',
        controller: 'LoginController',
        controllerUrl: '/static/javascripts/angular/authentication/controllers/login.controller.js'
    }))
    .when("/routes", angularAMD.route({
        templateUrl: '/static/javascripts/angular/route/templates/routes.html',
        controller: 'RoutesController',
        controllerUrl: '/static/javascripts/angular/route/controllers/routes.controller.js'
    }))
    .when("/route/create", angularAMD.route({
        templateUrl: '/static/javascripts/angular/route/templates/create_route.html',
        controller: 'CreateRouteController',
        controllerUrl: '/static/javascripts/angular/route/controllers/create.route.controller.js'
    }))
    .when("/route/:id", angularAMD.route({
        templateUrl: '/static/javascripts/angular/route/templates/route_details.html',
        controller: 'RouteController',
        controllerUrl: '/static/javascripts/angular/route/controllers/route.controller.js'
    }))
    .otherwise({redirectTo: "/routes"});
  });

  angularAMD.bootstrap(trackangle);

  return trackangle;
});
