
define(['trackangle', '/static/javascripts/angular/route/services/route.service.js'], function (trackangle) {
    trackangle.register.controller('RouteController', ['$scope', '$routeParams', 'RouteService', function ($scope, $routeParams, RouteService){

      RouteService.route($routeParams.id).then(getSuccessFunction, errorFunction);

      function getSuccessFunction(data, status, headers, config) {
          $scope.route = data.data;
      }

      function errorFunction(data, status, headers, config) {
          console.log("An error occured: " + data.error);
      }
  }]);
});
