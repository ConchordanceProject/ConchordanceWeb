angular.module('conchordance')
    .controller('appController', ['$scope', '$sce', 'conchordanceURL', '$conchordance',
        function($scope, $sce, conchordanceURL, $conchordance) {
            $scope.trust = function(value) {
                return $sce.trustAsHtml(value);
            };

            $scope.defaults = {
                root: "A",
                chordTypeName: "M",
                instrumentName: "Guitar",
                chordFingering: "x02220"
            };

            $scope.parameters = conchordanceURL.readParameters($scope.defaults);

            /**
             * Selected state that persists across multiple areas of the app
             * such as an instrument or a chord
             */
            $scope.selections = {
                root: $scope.parameters.root,
                chordType: null,
                instrument: null,
                chordFingering: null
            };

            $conchordance.getInstruments()
                .success(function(results) {
                    $scope.instruments = results;

                    // Find the instrument matching the query param
                    var paramInstrument = null;
                    for (var i = 0; i<results.length; ++i) {
                        if (results[i].name == $scope.parameters.instrumentName)
                            paramInstrument = results[i];
                    }
                    $scope.selections.instrument = paramInstrument || results[0];
                });

            $conchordance.getChordTypes()
                .success(function(results) {
                    $scope.chordTypes = results;
                    $scope.selections.chordType = results[0];

                    // Find the chord type matching the query param
                    var paramType = null;
                    for (var i = 0; i<results.length; ++i) {
                        if (results[i].name == $scope.parameters.chordTypeName)
                            paramType = results[i];
                    }
                    $scope.selections.chordType = paramType || results[0];
                });
        }
    ]);