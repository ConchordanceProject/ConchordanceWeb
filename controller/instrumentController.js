angular.module('conchordance')
.controller('instrument', ['$scope', 'conchordanceURL', function($scope, conchordanceURL) {

        $scope.showTuning = function() {
            if ($scope.selections.instrument) {
                var notes = new Array($scope.selections.instrument.tuning.length);
                for (var i = 0; i<notes.length; ++i)
                    notes[i] = $scope.selections.instrument.tuning[notes.length-i-1];
                $scope.notes = notes;

                console.log(notes);
            }
        }

        $scope.$watch('selections.instrument', function() {
            conchordanceURL.showInstrumentParameter($scope.selections);

            $scope.showTuning();
        });

        $scope.showTuning();
	}
]);