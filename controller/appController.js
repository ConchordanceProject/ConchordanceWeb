angular.module('conchordance')
    .controller('appController', ['$scope', '$sce', '$conchordance',
        function($scope, $sce, $conchordance) {
            $scope.trust = function(value) {
                return $sce.trustAsHtml(value);
            };

            /**
             * Selected state that persists across multiple areas of the app
             * such as an instrument or a chord
             */
            $scope.selections = {
                root: "A",
                chordType: null,
                instrument: null,
                chordFingering: null,
                displayMode: "diagram"
            }

            $scope.instruments = [];
            $scope.chordTypes = [];

            $conchordance.getInstruments()
                .success(function(results) {
                    $scope.instruments = results;
                    $scope.selections.instrument = results[0];
                });

            $conchordance.getChordTypes()
                .success(function(results) {
                    $scope.chordTypes = results;
                    $scope.selections.chordType = results[0];
                });
        }
    ]);