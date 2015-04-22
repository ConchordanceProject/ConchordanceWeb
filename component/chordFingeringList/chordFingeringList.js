angular.module('conchordance')
.directive('chordFingeringList', function() {
    return {
        restrict: 'E',
        templateUrl: 'component/chordFingeringList/chordFingeringList.html',
        scope: {

            /**
             *
             */
            chordFingeringClicked: '=',

            /**
             *
             */
            chordFingerings: '='
        },
        link: function(scope, element, attrs) {
            var positionAscending = function(chordA, chordB) {
                return chordA.position - chordB.position;
            }

            scope.$watch('chordFingerings', function(newList) {
                newList.sort(positionAscending);
                scope.sortedChords = newList;
            })
        }
    };
});