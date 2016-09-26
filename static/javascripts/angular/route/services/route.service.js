
define(['trackangle'], function (trackangle) {
    trackangle.register.factory('RouteService', ['$http', function ($http){

    var RouteService = {

        route:function getRoute(id) {
            return $http.get('/api/v1/route/' + id + '/')
        },
        routes:function getRoutes() {
            return $http.get('/api/v1/route/');
        },
        create:function createRoute(routeJSON) {
            return $http.post('/api/v1/route/', routeJSON);
        },
        update:function updateRoute(id, routeJSON) {
            return $http.put('/api/v1/route/' + id + '/', routeJSON);
        },
        delete:function deleteRoute(id) {
            return $http.delete('/api/v1/route/' + id + '/');
        }
    };
    return RouteService;
  }]);
});