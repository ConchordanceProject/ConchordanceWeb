angular.module('conchordance')
    .directive('instrumentSelector', [function() {
        return {
            restrict: 'E',
            templateUrl: 'component/instrumentSelector/instrumentSelector.html',
            scope: {
                instruments: '=',
                selectedInstrument: '='
            },
            link: function(scope, element, attrs) {
            }
        };
    }]);