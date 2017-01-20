'use strict';
define([], function() {

    var RatingDirective = function() {
        var directive = {
            replace:true,
            template: "<div><span class='glyphicon glyphicon-star' ng-repeat='n in getRate() track by $index'></span><span class='glyphicon glyphicon-star-empty' ng-repeat='n in getEmptyRate() track by $index'></span></div>",
            scope: {
                rate:'=',
                maxrate:'='
            },
            link: function (scope, element, attrs) {
                scope.getRate = function(){
                    var n = parseInt(scope.rate, 10);
                    return new Array(n);
                };
                scope.getEmptyRate = function(){
                    var n = scope.maxrate - parseInt(scope.rate, 10);
                    return new Array(n);
                };
            }
        };
        return directive;
    };

    return RatingDirective;

});
