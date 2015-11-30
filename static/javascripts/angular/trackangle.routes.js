(function () {
  'use strict';

  angular
    .module('trackangle.routes')
    .config(config);

  config.$inject = ['$routeProvider'];

  /**
  * @name config
  * @desc Define valid application routes
  */
  function config($routeProvider) {
    $routeProvider.when('/register', {
      controller: 'RegisterController', 
      controllerAs: 'vm',
      templateUrl: '/static/javascripts/angular/authentication/templates/register.html'
    }).otherwise('/');
  }
})();