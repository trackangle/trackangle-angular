(function () {
  'use strict';

  angular
    .module('trackangle.authentication', [
      'trackangle.authentication.controllers',
      'trackangle.authentication.services'
    ]);

  angular
    .module('trackangle.authentication.controllers', []);

  angular
    .module('trackangle.authentication.services', ['ngCookies']);
})();
