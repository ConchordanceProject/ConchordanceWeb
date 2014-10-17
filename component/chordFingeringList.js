angular.module('conchordance')
.directive('chordFingeringList', function() {
    return {
        restrict: 'E',
        templateUrl: 'views/chordFingeringList.html',
        scope: {

            /**
             *
             */
            chordFingeringClicked: '=',

            /**
             *
             */
            chordFingerings: '=',

            /**
             *
             */
            displayMode: '@'
        },
        link: function(scope, element, attrs) {
            var positionAscending = function(chordA, chordB) {
                return chordA.position - chordB.position;
            }

            console.log(scope.displayMode);

            scope.$watch('chordFingerings', function(newList) {
                newList.sort(positionAscending);
                scope.sortedChords = newList;
            })
        }
    };
});