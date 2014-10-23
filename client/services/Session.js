'use strict';

angular.module('conchordance')
  .factory('Session', function ($resource) {
    return $resource('/auth/session/');
  });
