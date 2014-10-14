angular.module('conchordance')
.controller('chordTheory', ['$scope', '$music', '$conchordance',
    function($scope, $music, $conchordance) {
		$scope.getChord = function() {
			if ($scope.selectedRoot != null && $scope.selectedChordType != null) {
				$conchordance.getChord($scope.selectedRoot, $scope.selectedChordType.name)
				.success(function(result) {					
					$scope.selectedChord = result;		

	            	// Move chords from the default octave they are created in by service
	            	var movedNotes = $music.adjustNotesOctaves(result.notes, 4);
					
					$scope.$broadcast('set-scale-notes', movedNotes);
				});
			}
		};

		$scope.chordTypes = [];
		$scope.selectedRoot = "A";
		$scope.selectedChordType = null;

        $scope.$watch('selectedRoot', function() {
            $scope.getChord();
        });

        // Fetch chord types from the server
		$conchordance.getChordTypes()
		.success(function(results) {
			$scope.chordTypes = results;
			$scope.selectedChordType = results[0];
			$scope.getChord();
		});		
	}
]);