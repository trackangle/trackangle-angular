(function () {
  'use strict';

  angular
  .module('trackangle.route', [
      'trackangle.route.controllers',
      'trackangle.route.services'
    ]);

  angular.module('trackangle.route.controllers', []);

  angular.module('trackangle.route.services', ['ngCookies']);
})();