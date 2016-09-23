
define(['trackangle'], function (trackangle) {
    trackangle.register.factory('RouteService', ['$http', function ($http){

    var RouteService = {

        route:function getRoute(id) {
            return $http.get('/api/v1/route/' + id + '/')
        },
        routes:function getRoutes() {
            return $http.get('/api/v1/route/');
        },
        createRoute:function createRoute(routeJSON) {
            return $http.post('/api/v1/route/', routeJSON);
        }
    };
    return RouteService;
  }]);
});