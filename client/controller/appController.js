angular.module('conchordance')
    .controller('appController', ['$scope', '$sce', '$conchordance', 'Auth',
        function($scope, $sce, $conchordance, Auth, $location) {
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

            $scope.logout = function() {
              Auth.logout(function(err) {
                if(!err) {
                  $location.path('/login');
                }
              });
            };
        }
    ]);