'use strict';
define(['trackangle', 'jquery'], function (trackangle) {
    trackangle.register.directive('smap', ['$timeout', function ($timeout) {
     return {
         restrict: 'E',
         replace: true,
         scope:{
             places: '='
         },
         template: '<div></div>',
         link: function (scope, element, attrs) {


             var map;
             var bounds;
             var service;
             var initialize = function() {
                 var myOptions = {
                     zoom: 6,
                     center: new google.maps.LatLng(46.87916, -3.32910),
                     mapTypeId: google.maps.MapTypeId.ROADMAP
                 };


                 //map = new google.maps.Map(element.children()[0], myOptions);
                 map = new google.maps.Map(document.getElementById(attrs.id), myOptions);
                 google.maps.event.trigger(map, 'resize');
                 map.setZoom( map.getZoom() );
                 bounds = new google.maps.LatLngBounds();
                 service = new google.maps.places.PlacesService(map);

                 for(var i=0; i<scope.places.length; i++){
                        setMap(scope.places[i].location_lat, scope.places[i].location_lng);
                 }


                 google.maps.event.addListener(map, 'click', function (e) {
                    scope.$apply(function () {
                     addMarker({
                         lat: e.latLng.lat(),
                         lng: e.latLng.lng()
                     });

                         console.log(e);
                 });
                }); // end click listener

             }


             var setMap = function(lat, lng) {
                 var pos = {lat: lat, lng: lng}
                 addMarker(pos);
             }


             var addMarker = function (pos) {
                 var myLatlng = new google.maps.LatLng(pos.lat, pos.lng);
                 var marker = new google.maps.Marker({
                     position: myLatlng,
                     map: map,
                     //title: "Hello World!"
                 });
                 bounds.extend(marker.getPosition());
                 map.fitBounds(bounds);
             } //end addMarker


             scope.$watch('places',function(newValue){
                 console.log(newValue);
                 initialize();


             });

         }
     }
  }]);
});
