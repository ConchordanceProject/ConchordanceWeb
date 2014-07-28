angular.module('conchordance')
.controller('chordTheory', ['$scope', '$sce', '$music', '$conchordance', 
    function($scope, $sce, $music, $conchordance) {
		$scope.noteNameHtml = function(interval) {
			return $sce.trustAsHtml($music.noteNameHtml(interval));	
		};
		
		$scope.intervalNameHtml = function(interval) {
			return $sce.trustAsHtml($music.intervalNameHtml(interval));
		};
		
		$scope.getChord = function() {
			if ($scope.selectedRoot != null && $scope.selectedChordType != null) {
				$conchordance.getChord($scope.selectedRoot, $scope.selectedChordType.name)
				.success(function(result) {
					$scope.selectedChord = result;
				});
			}
		};
		
		$scope.notes = $music.sharpNotes;		
		$scope.chordTypes = [];
		$scope.selectedRoot = $scope.notes[0];
		$scope.selectedChordType = null;

		$conchordance.getChordTypes()
		.success(function(results) {
			$scope.chordTypes = results;
			$scope.selectedChordType = results[0];
			$scope.getChord();
		});		
	}
]);