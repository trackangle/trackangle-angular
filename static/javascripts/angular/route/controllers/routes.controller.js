
define(['trackangle', 'google-maps', '/static/javascripts/angular/route/directives/smap.js'], function (trackangle) {
    trackangle.register.controller('RoutesController', function ($scope, $http) {
        console.log("AAAAAAAAAAAAAAAA");
        $http.get('/api-1.0/route/').then(getSuccessFunction, errorFunction);

        function getSuccessFunction(data, status, headers, config) {
            $scope.routes = data.data;

        };

        function errorFunction(data, status, headers, config) {
            console.log("An error occured: " + data.error);
        }

  });
});
