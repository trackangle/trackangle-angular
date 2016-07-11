'use strict';
define(['trackangle', 'google-maps'], function (trackangle) {
    trackangle.register.directive('repeatDirective', function () {
        return {
            scope: {
                someCtrlFn: '&callbackFn'
            },
            link: function (scope, element, attrs) {
                if (scope.$parent.$last) {
                    var options = {
                        types: ['(cities)']
                    };
                    var autocomplete = new google.maps.places.Autocomplete(element[0], options);
                    scope.someCtrlFn({arg1: autocomplete});
                }
            }
        }
    });
});
