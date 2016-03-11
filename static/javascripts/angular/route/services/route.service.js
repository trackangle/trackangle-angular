
define(['app'], function (app) {
    app.register.factory('RouteService', ['$http', function ($http){

    var RouteService = {
        routes:function getRoutes(email, password, username)
        {
            return $http.get('/api-1.0/route/');
        },

        createRoute:function createRoute(title, description, url_title, museum, food, shop) {
            return $http.post('/api-1.0/route/', {
                title: title,
                description: description,
                url_title: url_title,
                museum: museum,
                food: food,
                shop: shop
            })
        }
    }
    return RouteService;
  }]);
});