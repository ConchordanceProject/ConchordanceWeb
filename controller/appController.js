angular.module('conchordance')
    .controller('appController', ['$scope', '$sce', '$location', '$conchordance',
        function($scope, $sce, $location, $conchordance) {
            $scope.trust = function(value) {
                return $sce.trustAsHtml(value);
            };

            $scope.showChordParameter = function() {
                if ($scope.selections.root && $scope.selections.chordType)
                    $location.search('chord', $scope.selections.root + $scope.selections.chordType.name);
            }

            $scope.showFingeringParameter = function() {
                if ($scope.selections.chordFingering) {
                    var fingerString = "";
                    var frets = $scope.selections.chordFingering.capoRelativeFrets;
                    for (var s = $scope.selections.chordFingering.numStrings-1; s>=0; --s)
                        fingerString += frets[s] == -1 ? "x" : frets[s] ;

                    $location.search('position', fingerString);
                }
            }

            $scope.showInstrumentParameter = function() {
                if ($scope.selections.instrument)
                    $location.search('instr', $scope.selections.instrument.name);
            }

            /**
             * Selected state that persists across multiple areas of the app
             * such as an instrument or a chord
             */
            $scope.selections = {
                root: "A",
                chordType: null,
                instrument: null,
                chordFingering: null
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