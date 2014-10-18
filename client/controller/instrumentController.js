angular.module('conchordance')
.controller('instrument', ['$scope', function($scope) {
        $scope.$watch('selections.instrument', function(newInstrument) {
            if (newInstrument != null) {
                var notes = new Array(newInstrument.tuning.length);
                for (var i = 0; i<notes.length; ++i)
                    notes[i] = newInstrument.tuning[notes.length-i-1];
                $scope.$broadcast('set-scale-notes', notes);
            }
        });
	}
]);