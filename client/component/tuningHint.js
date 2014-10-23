angular.module('conchordance')
.directive('tuningHint', ['$music', '$sce', function($music, $sce) {
    return {
        restrict: 'E',
        templateUrl: 'views/tuningHint.html',
        scope: {
        	instrument: '='
        },
        link: function(scope, element, attrs) {
        	scope.tuning = [];
        	
        	scope.$watch('instrument', function(newInstrument, oldInstrument) {
        		if (newInstrument)
                    scope.tuning = newInstrument.tuning.slice(0).reverse();
        		else
                    scope.tuning = [];
        	});
        }
    };
}]);