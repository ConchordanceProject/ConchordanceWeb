angular.module('conchordance').service('$conchordance', function($http) {
    var requestBase = "http://api.conchordance.com/";
	this.getInstruments = function() {
		return $http({
			method: 'GET',
			url: requestBase + 'instruments'
		});
	};
	this.getFretboard = function(instrument, root, type) {
		return $http({
			method: 'GET',
			url: requestBase + 'fretboards',
			params: {
				instrument: instrument,
				type: type,
				root: root
			}
		});
	};
	this.getChordTypes = function() {
		return $http({
			method: 'GET',
			url: requestBase + 'chords/types'
		});
	};
	this.getChords = function(instrument, root, type) {
		return $http({
			method: 'GET',
			url: requestBase + 'chords/fingerings',
			params: {
				instrument: instrument,
				type: type,
				root: root
			}
		});
	};
	this.getChord = function(root, type) {
		return $http({
			method: 'GET',
			url: requestBase + 'chords',
			params: {
				type: type,
				root: root
			}
		});
	};
});