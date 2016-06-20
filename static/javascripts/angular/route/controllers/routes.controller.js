
define(['trackangle', 'google-maps', 'ngMap'], function (trackangle) {
    trackangle.register.controller('RoutesController', function ($scope, $http) {

        $http.get('/api/v1/route/').then(getSuccessFunction, errorFunction);

        function getSuccessFunction(data, status, headers, config) {
            $scope.routes = data.data;

        };

        function errorFunction(data, status, headers, config) {
            console.log("An error occured: " + data.error);
        }

  });
});
