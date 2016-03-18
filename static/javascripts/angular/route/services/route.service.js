
define(['trackangle'], function (trackangle) {
    trackangle.register.factory('RouteService', ['$http', function ($http){

    var RouteService = {
        routes:function getRoutes(email, password, username)
        {
            return $http.get('/api-1.0/route/');
        },

        createRoute:function createRoute(title, description, url_title, museum, food, shop) {
            console.log("AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAaa");
            /*var routeJSON = {
                route:{
                    title: title,
                    description: description,
                    url_title: url_title,
                },
                museum_set: [{"place_id": museum}],
                food_set: [{"place_id": food}],
                shop_set: [{"place_id": shop}]
            }*/

            var routeJSON = {
                title: title,
                description: description,
                url_title: url_title,
                museums: [{place_id: museum}],
                foods: [{place_id: food}],
                shops: [{place_id: shop}]
            }
            console.log(routeJSON);
            return $http.post('/api-1.0/route/', routeJSON);
        }
    }
    return RouteService;
  }]);
});