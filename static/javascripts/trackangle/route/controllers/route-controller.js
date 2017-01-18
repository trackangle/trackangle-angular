define([], function () {
    function RouteController($scope, $routeParams, RouteService) {
        RouteService.route($routeParams.url_title).then(getSuccessFunction, errorFunction);

        function getSuccessFunction(data, status, headers, config) {
            $scope.route = data.data;
        }

        function errorFunction(data, status, headers, config) {
            console.log("An error occured: " + data.error);
        }
    }

    RouteController.$inject = ['$scope', '$routeParams', 'RouteService'];
    return RouteController;
});
