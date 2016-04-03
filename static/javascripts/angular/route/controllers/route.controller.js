
define(['trackangle'], function (trackangle) {
    trackangle.register.controller('RouteController', function ($scope, $http, $routeParams) {
      console.log($routeParams.id);
      $http.get('/api/v1/route/' + $routeParams.id + '/').then(getSuccessFunction, errorFunction);

      function getSuccessFunction(data, status, headers, config) {
          $scope.route = data.data;
      };

      function errorFunction(data, status, headers, config) {
          console.log("An error occured: " + data.error);
      }
  });
});
