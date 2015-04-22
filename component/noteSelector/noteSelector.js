angular.module('conchordance')
    .directive('noteSelector', ['$music', '$sce', function($music, $sce) {
        return {
            restrict: 'E',
            templateUrl: 'component/noteSelector/noteSelector.html',
            scope: {
                selectedNote: '='
            },
            link: function(scope, element, attrs) {
                scope.toggleFlatSharp = function() {
                    scope.sharp = !scope.sharp;

                    var index = scope.notes.indexOf(scope.selectedNote);
                    scope.notes = scope.sharp ? $music.sharpNotes : $music.flatNotes;

                    var newNote = scope.notes[index];

                    // Only update the selection if it has changed
                    if (newNote != scope.selectedNote) {
                        scope.selectedNote = newNote;
                    }
                }

                scope.toggleLabel = $sce.trustAsHtml($music.modifierHtml(1) + "|" + $music.modifierHtml(-1));

                if (scope.selectedNote == undefined) {
                    scope.sharp = true;
                    scope.notes = $music.sharpNotes;
                } else {
                    var index = $music.sharpNotes.indexOf(scope.selectedNote);
                    if (index >= 0) {
                        scope.sharp = true;
                        scope.notes = $music.sharpNotes;
                    } else {
                        scope.sharp = false;
                        scope.notes = $music.flatNotes;
                    }
                }
            }
        };
    }]);