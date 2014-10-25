angular.module('conchordance')
.controller('chordDetails', ['$scope', 'conchordanceURL', '$music', '$conchordance', 'midi',
    function($scope, conchordanceURL, $music, $conchordance, midi) {
        $scope.chordLoaded = function() {
            $scope.chordName =
                $music.noteNameHtml($scope.selections.chordFingering.chord.root)
                    + "-" + $scope.selections.chordFingering.chord.typeName
                    + " on " + $scope.selections.instrument.name;
        }

        $scope.parameters = conchordanceURL.readParameters($scope.defaults);
        if ($scope.parameters.position) {
            // Navigated here from outside, read the parameter and load state
            $conchordance.getChordFingering(
                $scope.parameters.root,
                $scope.parameters.chordTypeName,
                $scope.parameters.instrumentName,
                $scope.parameters.position
            ).success(function(result) {
                    $music.calcDiagram(result);
                    console.log(result);
                    $scope.selections.chordFingering = result;
                    $scope.chordLoaded();
                })
        } else {
            // we navigated here through the app, or via a bad url
            // TODO check for a bad fingering parameter

            conchordanceURL.showChordParameter($scope.selections);
            conchordanceURL.showFingeringParameter($scope.selections);
            conchordanceURL.showInstrumentParameter($scope.selections);

            $scope.chordLoaded();
        }
        
        $scope.play = function() {
            midi.playNotes($scope.selections.chordFingering.notes);
        };
     }
]);