angular.module('conchordance')
    .controller('profileCtrl', ['$scope', '$rootScope',
        function($scope, $rootScope) {
            $scope.currentUser = $rootScope.currentUser;  
        }
    ]);