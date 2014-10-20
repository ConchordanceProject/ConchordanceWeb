angular.module('conchordance')
.controller('chordTheory', ['$scope', '$music', 'conchordanceURL', '$conchordance',
    function($scope, $music, conchordanceURL, $conchordance) {
		$scope.getChord = function() {
            conchordanceURL.showChordParameter($scope.selections);

			if ($scope.selections.root != null && $scope.selections.chordType != null) {
				$conchordance.getChord($scope.selections.root, $scope.selections.chordType.name)
				.success(function(result) {					
					$scope.selectedChord = result;		

	            	// Move chords from the default octave they are created in by service
	            	var movedNotes = $music.adjustNotesOctaves(result.notes, 4);
					
					$scope.notes = movedNotes;
				});
			}
		};

        $scope.$watch('selections.root', $scope.getChord);
        $scope.$watch('selections.chordType', $scope.getChord);
	}
]);