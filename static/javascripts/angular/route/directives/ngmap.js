'use strict';
define(['trackangle', 'jquery'], function (trackangle) {
    trackangle.register.directive('ngMap', ['$compile', function ($compile) {
     return {
         restrict: 'A',
         replace: false,
         transclude: true,
         scope:{
             places: '=?',
             autocompletetype: '@',
             lat: '=',
             lng: '='
         },
         templateUrl: "/static/javascripts/angular/route/templates/ngmap.html",
         link: function (scope, element, attrs) {

             if(!scope.places){
                 scope.places = [];
             }

             var map;
             var bounds;
             var service;
             var map_element = element[0].querySelector(".map_canvas");
             var autocomplete_input = element[0].querySelector('#pac-input');
             var geocoder = new google.maps.Geocoder;


             scope.initialize = function() {
                 var myOptions = {
                     zoom:  parseInt(attrs.zoom, 10),
                     center: new google.maps.LatLng(scope.lat, scope.lng),
                     mapTypeId: google.maps.MapTypeId.ROADMAP
                 };

                 map = new google.maps.Map(map_element, myOptions);
                 google.maps.event.trigger(map, 'resize');
                 map.setZoom( map.getZoom() );


                 bounds = new google.maps.LatLngBounds();
                 service = new google.maps.places.PlacesService(map);

                if(scope.places){
                    for(var i=0; i<scope.places.length; i++) {
                        addMarker(scope.places[i].location_lat, scope.places[i].location_lng, false);
                    }
                }

                if(attrs.autocomplete){
                    scope.initializeAutocomplete();
                }
                else{
                    $(autocomplete_input).hide();
                }

             }



             function addMarker(lat, lng, fromAutocomplete) {
                 var myLatlng = new google.maps.LatLng(lat, lng);
                 var marker = new google.maps.Marker({
                     position: myLatlng,
                     map: map,
                     //title: "Hello World!"
                 });


                 if(scope.places.length == 1) {
                         bounds.extend(marker.getPosition());
                         map.setCenter(marker.getPosition());
                         map.setZoom(17);
                 }
                 else {
                     bounds.extend(marker.getPosition());
                     map.fitBounds(bounds);
                 }


                 var loca = new google.maps.LatLng(lat,lng);
                 var requested = {
                     location: loca,
                     radius:.1,
                     //keyword:"library"//,
                     types : [scope.autocompletetype]

                 };
                 service.search(requested, function(results, status){
                     if (status == google.maps.places.PlacesServiceStatus.OK) {
                         var place = results[0];

                         if(fromAutocomplete) {
                             var tmp_place = {
                                 id: place.id,
                                 type: parseInt(attrs.placetype),
                                 location_lat: place.geometry.location.lat(),
                                 location_lng: place.geometry.location.lng()
                             };
                             scope.places.push(tmp_place);
                         }


                         marker.setIcon(({
                             url: place.icon,
                             size: new google.maps.Size(71, 71),
                             origin: new google.maps.Point(0, 0),
                             anchor: new google.maps.Point(17, 34),
                             scaledSize: new google.maps.Size(35, 35)
                         }));
                         scope.addInfoWindow(place.name, marker, place.vicinity);
                     }
                 });

             } //end addMarker



             scope.addInfoWindow = function(text, marker, address){

                 scope.$apply(function () {
                     var infowindow = new google.maps.InfoWindow();
                     infowindow.setContent('<div><strong>' + text + '</strong></div>' + address);
                     infowindow.open(map, marker);
                 });
             }

             scope.initializeAutocomplete = function(){

                 var options = {
                     types: [ scope.autocompletetype ]
                 };
                 var a_bounds = new google.maps.LatLngBounds(
                     new google.maps.LatLng(scope.lat, scope.lng)
                 );
                 options['bounds'] = a_bounds;

                 var autocomplete = new google.maps.places.Autocomplete(autocomplete_input, options);
                 autocomplete.bindTo('bounds', map);


                 autocomplete.addListener('place_changed', function() {

                     var place = autocomplete.getPlace();
                     if (!place.geometry) {
                         window.alert("Autocomplete's returned place contains no geometry");
                         return;
                     }

                     var marker = addMarker(place.geometry.location.lat(), place.geometry.location.lng(), true);



                 });

             }

             scope.$watch('zoom',function(newValue){
                 scope.initialize();
             });

         }
     }
  }]);
});
