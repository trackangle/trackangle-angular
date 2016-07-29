define(['trackangle'], function (trackangle) {
    trackangle.register.factory('RouteService', ['$http', function ($http){

    var RouteService = {
        routes:function getRoutes(email, password, username)
        {
            return $http.get('/api/v1/route/');
        },

        createRoute:function createRoute(routeJSON) {

            return $http.post('/api/v1/route/', routeJSON);
        }
    }
    return RouteService;
  }]);
});