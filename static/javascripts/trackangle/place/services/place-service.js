
define([], function () {
    function PlaceService($http) {

        var service = {

            place: function getPlace(id) {
                return $http.get('/api/v1/place/' + id + '/')
            },
            places: function getPlaces() {
                return $http.get('/api/v1/place/');
            },
            createComment: function saveComment(comment, place_id) {
                return $http.post('/api/v1/place/' + place_id + "/set_comment/", comment);
            },
            createBudget: function saveBudget(budget, place_id) {
                return $http.post('/api/v1/place/' + place_id + "/set_budget/", budget);
            },
            createRating: function saveRating(rating, place_id) {
                return $http.post('/api/v1/place/' + place_id + "/set_rating/", rating);
            },
            routes: function getRoutes(place_id) {
                return $http.get('/api/v1/place/' + place_id + "/get_routes/");
            }
        };
        return service;
    }
    PlaceService.$inject = ['$http'];
    return PlaceService;
});