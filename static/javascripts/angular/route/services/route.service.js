
define(['trackangle'], function (trackangle) {
    trackangle.register.factory('Route', ['$http', function ($http){

    var RouteService = {

        route:function getRoute(url_title) {
            return $http.get('/api/v1/route/' + url_title + '/')
        },
        routes:function getRoutes() {
            return $http.get('/api/v1/route/');
        },
        create:function createRoute(routeJSON) {
            return $http.post('/api/v1/route/', routeJSON);
        },
        update:function updateRoute(url_title, routeJSON) {
            return $http.put('/api/v1/route/' + url_title + '/', routeJSON);
        },
        delete:function deleteRoute(url_title) {
            return $http.delete('/api/v1/route/' + url_title + '/');
        }
    };
    return RouteService;
  }]);
});