/**
* Authentication
* @namespace trackangle.route.services
*/
(function () {
  'use strict';

  angular
    .module('trackangle.route.services')
    .factory('RouteService', RouteService);

  RouteService.$inject = ['$cookies', '$http'];

  /**
  * @namespace Authentication
  * @returns {Factory}
  */
  function RouteService($cookies, $http) {
    var RouteService = {
      routes: getRoutes
    };

    return RouteService;

    ////////////////////

    function getRoutes(email, password, username) {
      return $http.get('/api-1.0/route/');
    }
  }
})();