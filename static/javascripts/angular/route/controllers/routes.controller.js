
define(['app'], function (app) {
    app.register.controller('RoutesController', function ($scope, $http) {

        $http.get('/api-1.0/route/').then(getSuccessFunction, errorFunction);

        function getSuccessFunction(data, status, headers, config) {
            console.log("On success: "+ data.data[0].id);
            $scope.routes = data.data;
        };

        function errorFunction(data, status, headers, config) {
            console.log("An error occured: " + data.error);
        }
 
  });
});
