angular.module('conchordance')
.controller('chordDetails', ['$scope', 'conchordanceURL', '$music', '$conchordance', 'midi',
    function($scope, conchordanceURL, $music, $conchordance, midi) {
        $scope.alternateFingerings = [];

        $scope.chordLoaded = function() {
            $scope.chordName =
                $music.noteNameHtml($scope.selections.chordFingering.chord.root)
                    + "-" + $scope.selections.chordFingering.chord.typeName
                    + " on " + $scope.selections.instrument.name;
        }

        if ($scope.parameters.position) {
            // Navigated here from outside, read the parameter and load state
            $conchordance.getChordFingering(
                $scope.parameters.root,
                $scope.parameters.chordTypeName,
                $scope.parameters.instrumentName,
                $scope.parameters.position
            ).success(function(result) {
                    $music.calcDiagram(result);
                    $scope.selections.chordFingering = result;
                    $scope.chordLoaded();
                })
        } else {
            // we navigated here through the app
            conchordanceURL.showParameters($scope.parameters,
                $scope.selections.root,
                $scope.selections.chordType,
                $scope.selections.instrument,
                $scope.selections.chordFingering);

            $scope.chordLoaded();
        }

        // load alternate fingerings
        $conchordance.getAlternateFingerings(
                $scope.parameters.root,
                $scope.parameters.chordTypeName,
                $scope.parameters.instrumentName,
                $scope.parameters.position
            ).success(function(result) {
                for (var i = 0; i<result.length; ++i)
                    $music.calcDiagram(result[i]);
                $scope.alternateFingerings = result;
            });
        
        $scope.play = function() {
            midi.playNotes($scope.selections.chordFingering.notes);
        };
     }
]);