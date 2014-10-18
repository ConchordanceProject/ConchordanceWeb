angular.module('conchordance')
.controller('chordTheory', ['$scope', '$music', '$conchordance',
    function($scope, $music, $conchordance) {
		$scope.getChord = function() {
			if ($scope.selections.root != null && $scope.selections.chordType != null) {
				$conchordance.getChord($scope.selections.root, $scope.selections.chordType.name)
				.success(function(result) {					
					$scope.selectedChord = result;		

	            	// Move chords from the default octave they are created in by service
	            	var movedNotes = $music.adjustNotesOctaves(result.notes, 4);
					
					$scope.$broadcast('set-scale-notes', movedNotes);
				});
			}
		};

        $scope.$watch('selections.root', $scope.getChord);
        $scope.$watch('selections.chordType', $scope.getChord);
	}
]);