angular.module('conchordance')
    .controller('appController', ['$scope', '$state', '$sce',
        function($scope, $state, $sce) {
            $scope.trust = function(value) {
                return $sce.trustAsHtml(value);
            };

            $scope.setSelectedInstrument = function(selectedInstrument) {
                $scope.selectedInstrument = selectedInstrument;
            }

            $scope.setSelectedChordFingering = function(chordFingering) {
                $scope.selectedChordFingering = chordFingering;
            }
        }
    ]);