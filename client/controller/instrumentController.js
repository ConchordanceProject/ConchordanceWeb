angular.module('conchordance')
.controller('instrument', ['$scope', 'conchordanceURL', function($scope, conchordanceURL) {
        $scope.$watch('selections.instrument', function(newInstrument) {
            conchordanceURL.showInstrumentParameter($scope.selections);

            if (newInstrument) {
                var notes = new Array(newInstrument.tuning.length);
                for (var i = 0; i<notes.length; ++i)
                    notes[i] = newInstrument.tuning[notes.length-i-1];
                $scope.notes = notes;
            }
        });
	}
]);