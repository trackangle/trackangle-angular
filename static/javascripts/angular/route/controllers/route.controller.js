
define(['trackangle', 'route'], function (trackangle) {
    trackangle.register.controller('RouteController', ['$scope', '$routeParams', 'Route', function ($scope, $routeParams, Route){

      Route.route($routeParams.id).then(getSuccessFunction, errorFunction);

      function getSuccessFunction(data, status, headers, config) {
          $scope.route = data.data;
      }

      function errorFunction(data, status, headers, config) {
          console.log("An error occured: " + data.error);
      }
  }]);
});
