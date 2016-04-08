'use strict';
define(['trackangle', 'jquery'], function (trackangle) {
    trackangle.register.directive('places', ['$timeout', function ($timeout) {
     return {
         restrict: 'E',
         replace: true,

         template: '<h3>Hello World!!</h3>'

     }
  }]);
});
