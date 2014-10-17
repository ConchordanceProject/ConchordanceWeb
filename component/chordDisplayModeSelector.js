angular.module('conchordance')
    .directive('chordDisplayModeSelector', function() {
        return {
            restrict: 'E',
            templateUrl: 'views/chordDisplayModeSelector.html',
            scope: {
                mode: '='
            },
            link: function(scope, element, attrs) {
                scope.setMode = function(mode) {
                    scope.mode = mode;
                }
            }
        };
    });