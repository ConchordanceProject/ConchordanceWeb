angular.module('conchordance')
.controller('main', ['$scope', '$sce', '$music', '$conchordance', 
    function($scope, $sce, $music, $conchordance) {
		$scope.noteNameHtml = function(interval) {
			return $sce.trustAsHtml($music.noteNameHtml(interval));	
		};
		
		$scope.intervalNameHtml = function(interval) {
			return $sce.trustAsHtml($music.intervalNameHtml(interval));
		};
		
		$scope.findChords = function() {
			// Abort if parameters are invalid
			if ($scope.selectedInstrument == null
				|| $scope.selectedRoot == null
				|| $scope.selectedChordType == null) {
				$scope.chordFingerings = [];
				return;
			}			
			
			// Search chords from webservice
			$conchordance.getChords(
				$scope.selectedInstrument.name, 
				$scope.selectedRoot,
				$scope.selectedChordType.name
			).success(function(results) {
				$scope.chordFingerings = results;
			});
		};
		
		$scope.instrumentSelected = function() {
			$scope.$broadcast('instrument-selected', $scope.selectedInstrument);
		};
	
		$scope.notes = $music.sharpNotes;
		$scope.instruments = [];
		$scope.chordTypes = [];
		$scope.chordFingerings = [];
		$scope.selectedInstrument = null;
		$scope.selectedRoot = $scope.notes[0];
		$scope.selectedChordType = null;

		// Load the musical data from the server
		$conchordance.getInstruments()
		.success(function(results) {
			$scope.instruments = results;
			$scope.selectedInstrument = results[0];
            $scope.instrumentSelected();
        });

		$conchordance.getChordTypes()
		.success(function(results) {
			$scope.chordTypes = results;
			$scope.selectedChordType = results[0];
		});
	}
]);