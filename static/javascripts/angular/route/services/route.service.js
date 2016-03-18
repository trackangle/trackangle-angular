
define(['trackangle'], function (trackangle) {
    trackangle.register.factory('RouteService', ['$http', function ($http){

    var RouteService = {
        routes:function getRoutes(email, password, username)
        {
            return $http.get('/api-1.0/route/');
        },

        createRoute:function createRoute(title, description, url_title, museum, food, shop) {

            var routeJSON = {
                title: title,
                description: description,
                url_title: url_title,
                places: [{id: shop, type:0}, {id: museum, type: 1}, {id: food, type:2}]
            }

            return $http.post('/api-1.0/route/', routeJSON);
        }
    }
    return RouteService;
  }]);
});