'use strict';
define(['trackangle', 'google-maps'], function (trackangle) {
    trackangle.register.directive('repeatDirective', function () {
        return {
            scope: {
                someCtrlFn: '&callbackFn',
                city: '='
            },
            link: function (scope, element, attrs) {

                //if (scope.$parent.$last) {

                var options = {
                    types: ['(cities)']
                };

                var autocomplete = new google.maps.places.Autocomplete(element[0], options);
                google.maps.event.addListener(autocomplete, 'place_changed', function(){
                    console.log(autocomplete.getPlace());
                });
                /*$(element[0]).val(scope.city);
                google.maps.event.addDomListener(element[0],'keydown',function(e){
                    if(e.keyCode===13 && !e.triggered){
                        google.maps.event.trigger(this,'keydown',{keyCode:40})
                        google.maps.event.trigger(this,'keydown',{keyCode:13,triggered:true})
                    }
                });
                $(element[0]).focus().trigger({ type : 'keypress', which : 13 });$('#autocomplete_0').focus().trigger({ type : 'keypress', which : 13 });
                google.maps.event.trigger(autocomplete, 'place_changed');
*/


                    console.log(scope.city);

                var geocoder = new google.maps.Geocoder;
                geocoder.geocode({'address': scope.city}, function (results, status) {
                    if (status === google.maps.GeocoderStatus.OK) {
                        if (results[0]) {
                            console.log(results[0]);
                            $(element[0]).val(scope.city);
                            autocomplete.set("place", results[0]);
                            scope.someCtrlFn({arg1: autocomplete});
                        }
                    }
                });
                    /*if(scope.place){
                        console.log(scope.place);
                        autocomplete.set("place", scope.place);
                    }*/
                //scope.someCtrlFn({arg1: autocomplete});


                //}
            }
        }
    });
});
