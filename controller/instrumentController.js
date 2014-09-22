angular.module('conchordance')
.controller('instrument', ['$scope', '$sce', '$music', '$conchordance', 
    function($scope, $sce, $music, $conchordance) {
		$scope.noteNameHtml = function(interval) {
			return $sce.trustAsHtml($music.noteNameHtml(interval));	
		};

		$scope.instrumentSelected = function() {
			if ($scope.selectedInstrument != null) {
				var notes = new Array($scope.selectedInstrument.tuning.length);
				for (var i = 0; i<notes.length; ++i)
					notes[i] = $scope.selectedInstrument.tuning[notes.length-i-1];
				$scope.$broadcast('set-scale-notes', notes);
			}
        };

		// Load the musical data from the server
		$conchordance.getInstruments()
		.success(function(results) {
			$scope.instruments = results;
			$scope.selectedInstrument = results[0];
            $scope.instrumentSelected();
        });
	}
]);