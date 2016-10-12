
define(['trackangle'], function (trackangle) {
    trackangle.register.factory('Place', ['$http', function ($http){

    var PlaceService = {

        place:function getPlace(id) {
            return $http.get('/api/v1/place/' + id + '/')
        },
        places:function getPlaces() {
            return $http.get('/api/v1/place/');
        },
        create:function createPlace(placeJSON) {
            return $http.post('/api/v1/place/', placeJSON);
        },
        update:function updatePlace(id, placeJSON) {
            return $http.put('/api/v1/place/' + id + '/', placeJSON);
        },
        delete:function deletePlace(id) {
            return $http.delete('/api/v1/place/' + id + '/');
        }
    };
    return PlaceService;
  }]);
});