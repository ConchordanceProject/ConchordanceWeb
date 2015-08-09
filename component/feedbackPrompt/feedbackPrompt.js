angular.module('conchordance')
    .directive('feedbackPrompt', ['$cookies', function($cookies) {
        return {
            restrict: 'E',
            templateUrl: 'component/feedbackPrompt/feedbackPrompt.html',
            scope: {
            },
            link: function(scope, element, attrs) {
                scope.showFeedbackPrompt = !$cookies.hasSeenFeedbackPrompt;

                scope.close = function() {
                    scope.showFeedbackPrompt = false;
                    $cookies.hasSeenFeedbackPrompt = true;
                };
            }
        };
    }]);