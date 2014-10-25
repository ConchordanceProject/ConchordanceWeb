angular.module('conchordance')
.controller('chordDetails', ['$scope', 'conchordanceURL', '$music', '$conchordance', '$midi',
    function($scope, conchordanceURL, $music, $conchordance, $midi) {
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
            var velocity = 127; // how hard the note hits
            var delay = 0; // play one note every quarter second
            var increment = 0.1; // amount to delay each note
            var duration = 2; // length for each note to play
            $midi.setVolume(0, 127);
            
            // Iterate through notes
            for (var index = $scope.selections.chordFingering.notes.length - 1; index >= 0; index--) {
                // Check for note
                var noteGroup = $scope.selections.chordFingering.notes[index];
                if (noteGroup) {
                    // Get the midi note
                    var note = noteGroup.note.halfSteps;
                    // play the note
                    $midi.noteOn(0, note, velocity, delay);
                    $midi.noteOff(0, note, delay + duration);
                    // Increment the delay
                    delay += increment;
                }
            }
        };
     }
]);