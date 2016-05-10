'use strict';
define(['trackangle', 'jquery'], function (trackangle) {
    trackangle.register.directive('smap', ['$timeout', function ($timeout) {
     return {
         restrict: 'A',
         replace: false,
         transclude: true,
         scope:{
             places: '=',
             zoom: '=',
             lat: '@',
             lng: '@',
             clickable: '@',
             autocomplete: '@',
             autocompletetype: '@'
         },
         templateUrl: "/static/javascripts/angular/route/templates/smap.html",
         link: function (scope, element, attrs) {

             scope.removeMarker = function(){
                 console.log("asdasdasd");
             }

             var map;
             var bounds;
             var service;
             var marker_list = [];
             var map_element = element[0].querySelector(".map_canvas");
             var autocomplete_input = element[0].querySelector('#pac-input');

             var initialize = function() {
                 var myOptions = {
                     zoom: scope.zoom,
                     center: new google.maps.LatLng(scope.lat, scope.lng),
                     mapTypeId: google.maps.MapTypeId.ROADMAP
                 };

                 map = new google.maps.Map(map_element, myOptions);
                 google.maps.event.trigger(map, 'resize');
                 map.setZoom( map.getZoom() );
                 bounds = new google.maps.LatLngBounds();
                 service = new google.maps.places.PlacesService(map);

                if(scope.places){
                    var marker;
                    for(var i=0; i<scope.places.length; i++) {
                        marker = addMarker(scope.places[i].location_lat, scope.places[i].location_lng);
                        bounds.extend(marker.getPosition());
                        map.fitBounds(bounds);
                 }

                }
                if(scope.clickable) {
                    addClickListener();
                }
                else{
                    $(autocomplete_input).hide();
                }

                if(scope.autocomplete){
                    initializeAutocomplete();
                }

             }



             function addClickListener(){
                 google.maps.event.addListener(map, 'click', function (e) {
                    scope.$apply(function () {
                     addMarker({
                         lat: e.latLng.lat(),
                         lng: e.latLng.lng()
                     });
                         console.log(e);
                 });
                });
             }


             function addMarker(lat, lng) {
                 var myLatlng = new google.maps.LatLng(lat, lng);
                 var marker = new google.maps.Marker({
                     position: myLatlng,
                     map: map,
                     //title: "Hello World!"
                 });

                 marker_list.push(marker);
                 return marker;
             } //end addMarker

             function addInfoWindow(text, marker, address){

                 var infowindow = new google.maps.InfoWindow();
                 infowindow.setContent('<div><strong>' + text + '</strong></div>' + address + '<div><button ng-click="removeMarker()">remove</button></div>');

                 infowindow.open(map, marker);

                 //$("#place_address").text(address);
             }



             function load_content(url){
                 var html = $.ajax({
                     url: url,
                     async: false}).responseText;
                 return html;
             }


             function initializeAutocomplete(){

                  var options = {
                      types: ['(' + scope.autocompletetype + ')']
                  };

                 //var input = document.getElementById('pac-input');
                 var autocomplete = new google.maps.places.Autocomplete(autocomplete_input, options);
                 autocomplete.bindTo('bounds', map);



                 autocomplete.addListener('place_changed', function() {

                     var place = autocomplete.getPlace();
                     if (!place.geometry) {
                         window.alert("Autocomplete's returned place contains no geometry");
                         return;
                     }

                     // If the place has a geometry, then present it on a map.
                    /* if (place.geometry.viewport) {
                         map.fitBounds(place.geometry.viewport);
                     } else {
                         map.setCenter(place.geometry.location);
                         map.setZoom(17);  // Why 17? Because it looks good.
                     }*/

                     var marker = addMarker(place.geometry.location.lat(), place.geometry.location.lng());
                     if(marker_list.length == 0) {
                         map.setCenter(place.geometry.location);
                         map.setZoom(17);
                     }
                     else {
                         bounds.extend(marker.getPosition());
                         map.fitBounds(bounds);
                     }

                     var address = '';
                     if (place.address_components) {
                         address = [
                                    (place.address_components[0] && place.address_components[0].short_name || ''),
                                    (place.address_components[1] && place.address_components[1].short_name || ''),
                                    (place.address_components[2] && place.address_components[2].short_name || '')
                                   ].join(' ');
                     }
                     marker.setIcon(({
                         url: place.icon,
                         size: new google.maps.Size(71, 71),
                         origin: new google.maps.Point(0, 0),
                         anchor: new google.maps.Point(17, 34),
                         scaledSize: new google.maps.Size(35, 35)
                     }));
                     addInfoWindow(place.name, marker, address);
                 });

             }

             scope.$watch('zoom',function(newValue){
                 initialize();
             });

         }
     }
  }]);
});
