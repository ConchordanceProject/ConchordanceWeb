angular.module('conchordance')
    .directive('inversionText', function() {
        return {
            restrict: 'E',
            template: '<span class="">{{inversion}}</span>',
            scope: {
                /**
                 *
                 */
                chordFingering: '='
            },
            link: function(scope, element, attrs) {
                scope.$watch('chordFingering', function(newChord) {
                    if (newChord) {
                        if (newChord.inversion == 0)
                            scope.inversion = 'Root position';
                        else if (newChord.inversion == 1)
                            scope.inversion = 'First inversion';
                        else if (newChord.inversion == 2)
                            scope.inversion = 'Second inversion';
                        else if (newChord.inversion == 3)
                            scope.inversion = 'Third inversion';
                    }
                });
            }
        };
    });