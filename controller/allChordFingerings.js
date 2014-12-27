angular.module('conchordance')
.controller('allChordFingerings', ['$scope', '$conchordance', '$music', function($scope, conchordance, music) {
        $scope.allChordFingerings = [];

        conchordance.getAllFingerings($scope.selections.instrument.name)
            .success(function(results) {
                for (var i = 0; i<results.length; ++i)
                    music.calcDiagram(results[i]);
                $scope.allChordFingerings = results;
            });
	}
]);