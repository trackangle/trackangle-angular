
define([], function () {
    function RouteService($http) {

        var service = {

            route: function getRoute(url_title) {
                return $http.get('/api/v1/route/' + url_title + '/')
            },
            routes: function getRoutes() {
                return $http.get('/api/v1/route/');
            },
            create: function createRoute(routeJSON) {
                return $http.post('/api/v1/route/', routeJSON);
            },
            update: function updateRoute(url_title, routeJSON) {
                return $http.put('/api/v1/route/' + url_title + '/', routeJSON);
            },
            delete: function deleteRoute(url_title) {
                return $http.delete('/api/v1/route/' + url_title + '/');
            },
            addPlace: function addPlace(url_title, place) {
                return $http.post('/api/v1/route/' + url_title + '/add_place/', place);
            },
            removePlace: function removePlace(url_title, place) {
                return $http.post('/api/v1/route/' + url_title + '/delete_place/', place);
            }
        };
        return service;
    }
    RouteService.$inject = ['$http'];
    return RouteService;
});